# std::filesystem::directory_entry::path

```cpp
const std::filesystem::path& path() const noexcept;  // (desde C++17)
operator const std::filesystem::path& () const noexcept;  // (desde C++17)
```

  
Retorna o caminho completo ao qual a entrada de diretório se refere. 

### Parâmetros

(nenhum) 

### Valor de retorno

O caminho completo ao qual a entrada de diretório se refere. 

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    
    namespace fs = std::filesystem;
    
    std::string get_stem(const fs::path& p) { return p.stem().string(); }
    void create_file(const fs::path& p) { std::ofstream o{p}; }
    
    int main()
    {
        const fs::path dir{"tmp_dir"};
        fs::create_directory(dir);
        create_file(dir / "one");
        create_file(dir / "two");
        create_file(dir / "three");
    
        for (const auto& file : fs::directory_iterator(dir))
        {
            // Explicit conversion
            std::cout << get_stem(file.path()) << '\n';
    
            // Implicit conversion
            std::cout << get_stem(file) << '\n';
        }
    
        fs::remove_all(dir);
    }
```

Saída possível: 
```
    two
    two
    one
    one
    three
    three
```

### Veja também

[ path](<#/doc/filesystem/path>)(C++17) |  representa um caminho   
(classe)  