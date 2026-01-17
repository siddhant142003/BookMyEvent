package com.eventapp.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class QrCodeGenerator {

    private static final int WIDTH = 300;
    private static final int HEIGHT = 300;

    public static void generateQRCodeImage(String text, String filePath)
            throws WriterException, IOException {

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix =
                qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, WIDTH, HEIGHT);

        BufferedImage image =
                new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);

        for (int x = 0; x < WIDTH; x++) {
            for (int y = 0; y < HEIGHT; y++) {
                image.setRGB(x, y, bitMatrix.get(x, y) ? 0x000000 : 0xFFFFFF);
            }
        }

        ImageIO.write(image, "PNG", new File(filePath));
    }
}