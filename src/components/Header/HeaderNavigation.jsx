function HeaderNavigation() {
    return (
        <div className="flex items-center space-x-6">
            <a
                href="/design"
                className="cursor-pointer hover:no-underline link-underline link-underline-black pb-2"
            >
                Submit Design
            </a>
            <a
                href="/challenges"
                className="cursor-pointer hover:no-underline link-underline link-underline-black pb-2"
            >
                Challenges
            </a>
            <a
                href="/solutions"
                className="cursor-pointer hover:no-underline link-underline link-underline-black pb-2"
            >
                Solutions
            </a>
        </div>
    );
}

export default HeaderNavigation;
