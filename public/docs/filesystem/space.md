# std::filesystem::space

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
std::filesystem::space_info space( const std::filesystem::path& p );
std::filesystem::space_info space( const std::filesystem::path& p,
std::error_code& ec ) noexcept;
```

Determina as informações sobre o sistema de arquivos no qual o caminho `p` está localizado, como se fosse por POSIX [`statvfs`](<https://pubs.opengroup.org/onlinepubs/9799919799/functions/fstatvfs.html>).

Preenche e retorna um objeto do tipo [`filesystem::space_info`](<#/doc/filesystem/space_info>), definido a partir dos membros da struct POSIX `statvfs` da seguinte forma:

  * [`space_info.capacity`](<#/doc/filesystem/space_info>) é definido como se fosse por `f_blocks * f_frsize`.
  * [`space_info.free`](<#/doc/filesystem/space_info>) é definido como `f_bfree * f_frsize`.
  * [`space_info.available`](<#/doc/filesystem/space_info>) é definido como `f_bavail * f_frsize`.
  * Qualquer membro que não pôde ser determinado é definido como `static_cast<[std::uintmax_t](<#/doc/types/integer>)>(-1)`.

A sobrecarga que não lança exceções define todos os membros como `static_cast<[std::uintmax_t](<#/doc/types/integer>)>(-1)` em caso de erro.

### Parâmetros

- **p** — caminho a ser examinado
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

As informações do sistema de arquivos (um objeto [`filesystem::space_info`](<#/doc/filesystem/space_info>)).

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construído com `p` como o primeiro argumento de caminho e o código de erro do sistema operacional como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa `ec.[`clear`](<#/doc/error/error_code/clear>)()` se nenhum erro ocorrer.

### Observações

[`space_info.available`](<#/doc/filesystem/space_info>) pode ser menor que [`space_info.free`](<#/doc/filesystem/space_info>).

### Exemplo

Execute este código
```
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

[ space_info](<#/doc/filesystem/space_info>)(C++17) | informações sobre espaço livre e disponível no sistema de arquivos
(classe)