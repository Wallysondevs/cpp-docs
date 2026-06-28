# std::filesystem::space_info

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
struct space_info {
std::uintmax_t capacity;
std::uintmax_t free;
std::uintmax_t available;
};
```

  
Representa as informações do sistema de arquivos conforme determinado por [`filesystem::space`](<#/doc/filesystem/space>). 

### Objetos membro

capacity |  tamanho total do sistema de arquivos, em bytes   
(objeto membro público)  
free |  espaço livre no sistema de arquivos, em bytes   
(objeto membro público)  
available |  espaço livre disponível para um processo não privilegiado (pode ser igual ou menor que `free`)   
(objeto membro público)  
  
### Funções não-membro

** operator==**(C++20) |  compara dois `space_info`s   
(função)  
  
##  operator==(std::filesystem::space_info)

```cpp
friend bool operator==( const space_info&, const space_info& ) = default;  // (desde C++20)
```

  
Verifica se `capacity`, `free` e `available` de ambos os argumentos são iguais, respectivamente. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando std::filesystem::space_info é uma classe associada dos argumentos. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <filesystem>
    #include <iostream>
    #include <locale>
     
    std::uintmax_t disk_usage_percent(const std::filesystem::space_info& si,
                                      bool is_privileged = false) noexcept
    {
        if (constexpr std::uintmax_t X(-1);
            si.capacity == 0 || si.free == 0 || si.available == 0 ||
            si.capacity == X || si.free == X || si.available == X
        )
            return 100;
     
        std::uintmax_t unused_space = si.free, capacity = si.capacity;
        if (!is_privileged)
        {
            const std::uintmax_t privileged_only_space = si.free - si.available;
            unused_space -= privileged_only_space;
            capacity -= privileged_only_space;
        }
        const std::uintmax_t used_space{capacity - unused_space};
        return 100 * used_space / capacity;
    }
     
    void print_disk_space_info(auto const& dirs, int width = 14)
    {
        (std::cout << std::left).imbue(std::locale("en_US.UTF-8"));
     
        for (const auto s : {"Capacity", "Free", "Available", "Use%", "Dir"})
            std::cout << "│ " << std::setw(width) << s << ' ';
     
        for (std::cout << '\n'; auto const& dir : dirs)
        {
            std::error_code ec;
            const std::filesystem::space_info si = std::filesystem::space(dir, ec);
            for (auto x : {si.capacity, si.free, si.available, disk_usage_percent(si)})
                std::cout << "│ " << std::setw(width) << static_cast<std::intmax_t>(x) << ' ';
            std::cout << "│ " << dir << '\n';
        }
    }
     
    int main()
    {
        const auto dirs = {"/dev/null", "/tmp", "/home", "/proc", "/null"};
        print_disk_space_info(dirs);
    }
```

Saída possível: 
```
    │ Capacity       │ Free           │ Available      │ Use%           │ Dir            
    │ 84,417,331,200 │ 42,732,986,368 │ 40,156,028,928 │ 50             │ /dev/null
    │ 84,417,331,200 │ 42,732,986,368 │ 40,156,028,928 │ 50             │ /tmp
    │ -1             │ -1             │ -1             │ 100            │ /home
    │ 0              │ 0              │ 0              │ 100            │ /proc
    │ -1             │ -1             │ -1             │ 100            │ /null
```

### Veja também

[ space](<#/doc/filesystem/space>)(C++17) |  determina o espaço livre disponível no sistema de arquivos   
(função)  