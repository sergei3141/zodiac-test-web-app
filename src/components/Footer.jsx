import { Icon } from '@iconify/react';
const tg = window.Telegram.WebApp;

function Footer() {

    const onClose = () => {
        tg.close();
      };

    return(
        <footer className="footer" onClick={onClose}>
            <Icon icon="material-symbols:tab-close-outline" />
        </footer>
    )
}

export default Footer
