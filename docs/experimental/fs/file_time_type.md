# std::experimental::filesystem::file_time_type

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
using file_time_type = chrono::time_point</*trivial-clock*/>;
```

  
Representa o tempo do arquivo. `trivial-clock` é um tipo definido pela implementação que satisfaz [TrivialClock](<#/doc/named_req/TrivialClock>) e é suficiente para representar a resolução e o intervalo dos valores de tempo de arquivo oferecidos pelo filesystem.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <experimental/filesystem>
    #include <fstream>
    #include <iomanip>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    using namespace std::chrono_literals;
     
    int main()
    {
        fs::path p = fs::current_path() / "example.bin";
        std::ofstream(p.c_str()).put('a'); // create file
        auto ftime = fs::last_write_time(p);
     
        std::time_t cftime = decltype(ftime)::clock::to_time_t(ftime); // assuming system_clock
        std::cout << "File write time is " << std::asctime(std::localtime(&cftime)) << '\n';
     
        fs::last_write_time(p, ftime + 1h); // move file write time 1 hour to the future
        ftime = fs::last_write_time(p); // read back from the filesystem
     
        cftime = decltype(ftime)::clock::to_time_t(ftime);
        std::cout << "File write time is " << std::asctime(std::localtime(&cftime)) << '\n';
        fs::remove(p);
    }
```

Saída possível: 
```
    File write time is Tue Mar 31 19:47:04 2015
     
    File write time is Tue Mar 31 20:47:04 2015
```

### Ver também

[ last_write_time](<#/doc/experimental/fs/last_write_time>) |  obtém ou define o tempo da última modificação de dados   
(function)  