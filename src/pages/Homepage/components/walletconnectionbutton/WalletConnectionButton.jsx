// dependencies
import { useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";

// componets
import { ButtonDefault } from "/src/components/ButtonDefault";

export const WalletConnectionButton = () => {
    const wallet = useTonWallet();
    const { open } = useTonConnectModal();

    if (wallet) {
        return null;
    }

    return <ButtonDefault onClick={open}>Connect Wallet</ButtonDefault>;
};
