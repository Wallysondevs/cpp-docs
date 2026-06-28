# std::filesystem::file_time_type

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
using file_time_type = std::chrono::time_point</*trivial-clock*/>;
(até C++20)
using file_time_type = std::chrono::time_point<std::chrono::file_clock>;
```

Representa o tempo do arquivo.

/*trivial-clock*/ é um tipo definido pela implementação que satisfaz [TrivialClock](<#/doc/named_req/TrivialClock>) e é suficiente para representar a resolução e o intervalo dos valores de tempo de arquivo oferecidos pelo filesystem. | (até C++20)

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <filesystem>
    #include <format>
    #include <fstream>
    #include <iostream>
     
    using namespace std::chrono_literals;
     
    int main()
    {
        auto p = std::filesystem::temp_directory_path() / "example.bin";
        std::ofstream{p.c_str()}.put('a'); // create file
     
        std::filesystem::file_time_type ftime = std::filesystem::last_write_time(p);
        std::cout << std::format("File write time is {}\n", ftime);
     
        // move file write time 1 hour to the future
        std::filesystem::last_write_time(p, ftime + 1h);
     
        // read back from the filesystem
        ftime = std::filesystem::last_write_time(p);
        std::cout << std::format("File write time is {}\n", ftime);
     
        std::filesystem::remove(p);
    }
```

Saída possível:
```
    File write time is 2023-09-04 19:33:24.702639224
    File write time is 2023-09-04 20:33:24.702639224
```

### Veja também

[ last_write_time](<#/doc/filesystem/last_write_time>)(C++17) | obtém ou define o tempo da última modificação de dados
(função)