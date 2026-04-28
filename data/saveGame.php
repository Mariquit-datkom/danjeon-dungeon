<?php
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    $slot = $data['slot'];
    $saveContent = json_encode($data['saveData'], JSON_PRETTY_PRINT);
    
    // Create a filename like "save_1.json"
    $filename = "../docs/saves/danjeon_save_" . $slot . ".json";
    
    // Ensure the folder exists
    if (!file_exists('../docs/saves/')) {
        mkdir('../docs/saves/', 0777, true);
    }

    // Write the file to the disk
    file_put_contents($filename, $saveContent);

    echo json_encode(["status" => "success", "message" => "File saved to $filename"]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid data"]);
}
?>