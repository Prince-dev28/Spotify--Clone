import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import SongSection from "./components/SongSection";
import MusicBar from "./components/MusicBar";
import AuthModal from "./components/AuthModal";
import AccountModal from "./components/AccountModal";
import Footer from "./components/Footer";
import { useAuth } from "./hooks/useAuth";
import { usePlayer } from "./hooks/usePlayer";
import { sections } from "./data/songs";

export default function App() {
    const auth = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchActive, setSearchActive] = useState(false);

    const [authModal, setAuthModal] = useState(null);
    const [accountModal, setAccountModal] = useState(null);

    const player = usePlayer({
        isLoggedIn: auth.isLoggedIn,
        onPreviewEnd: () =>
            setAuthModal({
                mode: "login",
                message: "That's the end of your free 20-second preview — log in or sign up to keep listening."
            })
    });

    let runningOffset = 0;
    const sectionsWithOffsets = sections.map((section) => {
        const offset = runningOffset;
        runningOffset += section.songs.length;
        return { ...section, offset };
    });

    const q = searchQuery.trim().toLowerCase();
    const filteredSections = useMemo(() => {
        if (!q) return sectionsWithOffsets;
        return sectionsWithOffsets
            .map((section) => ({
                ...section,
                songs: section.songs.filter(
                    (song) =>
                        song.title.toLowerCase().includes(q) || song.artist.toLowerCase().includes(q)
                )
            }))
            .filter((section) => section.songs.length > 0);
    }, [q]);

    const noResults = q.length > 0 && filteredSections.length === 0;

    function handleSongClick(globalIndex) {
        if (globalIndex === player.currentIndex) {
            player.togglePlayPause();
        } else {
            player.playIndex(globalIndex);
        }
    }

    return (
        <>
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onSearchOpen={() => setSearchActive(true)}
                onSearchClose={() => {
                    setSearchActive(false);
                    setSearchQuery("");
                }}
            />

            <div className="main-section">
                <TopNav
                    onMenuToggle={() => setSidebarOpen((v) => !v)}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchActive={searchActive}
                    onSearchOpen={() => setSearchActive(true)}
                    onSearchClose={() => setSearchActive(false)}
                    user={auth.user}
                    onOpenAuth={(mode) => setAuthModal({ mode })}
                    onOpenProfile={() => setAccountModal("profile")}
                    onOpenSettings={() => setAccountModal("settings")}
                    onLogout={() => auth.logOut()}
                />

                {noResults && <p className="no-results show">No results found.</p>}

                {filteredSections.map((section) => (
                    <SongSection
                        key={section.title}
                        title={section.title}
                        songs={section.songs}
                        globalIndexOffset={section.offset}
                        currentIndex={player.currentIndex}
                        isPlaying={player.isPlaying}
                        onPlay={handleSongClick}
                    />
                ))}

                <Footer />
            </div>

            <MusicBar
                currentSong={player.currentSong}
                coverSrc={player.coverSrc}
                isPlaying={player.isPlaying}
                currentTime={player.currentTime}
                duration={player.duration}
                volume={player.volume}
                showPreviewBadge={player.showPreviewBadge}
                onTogglePlayPause={player.togglePlayPause}
                onNext={player.playNext}
                onPrev={player.playPrev}
                onSeek={player.seekTo}
                onVolumeChange={player.changeVolume}
            />

            {authModal && (
                <AuthModal
                    mode={authModal.mode}
                    initialMessage={authModal.message}
                    auth={auth}
                    onModeChange={(mode) => setAuthModal({ mode })}
                    onClose={() => setAuthModal(null)}
                />
            )}

            {accountModal && (
                <AccountModal
                    mode={accountModal}
                    user={auth.user}
                    auth={auth}
                    onClose={() => setAccountModal(null)}
                />
            )}
        </>
    );
}