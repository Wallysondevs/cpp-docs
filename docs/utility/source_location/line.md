# std::source_location::line

```cpp
constexpr std::uint_least32_t line() const noexcept;  // (desde C++20)
```

Retorna o número da linha representado por este objeto.

### Parâmetros

(nenhum)

### Valor de retorno

O número da linha representado por este objeto.

Uma implementação é encorajada a retornar `0` quando o número da linha é desconhecido.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string_view>
    #include <source_location>
     
    inline void cur_line(
        const std::string_view message = "",
        const std::source_location& location = std::source_location::current())
    {
        std::cout
            << location.line() // <- the line # of a call site
            << ") "
            << message;
    }
     
    int main()
    {
        cur_line("++\n");
        cur_line(); std::cout << "Hello,\n";
        cur_line(); std::cout << "C++20!\n";
        cur_line("--\n");
    }
```

Saída:
```
    17) ++
    18) Hello,
    19) C++20!
    20) --
```

### Veja também

[ column](<#/doc/utility/source_location/column>) | retorna o número da coluna representado por este objeto
(função membro pública)
[ file_name](<#/doc/utility/source_location/file_name>) | retorna o nome do arquivo representado por este objeto
(função membro pública)
[ function_name](<#/doc/utility/source_location/function_name>) | retorna o nome da função representado por este objeto, se houver
(função membro pública)
[ source_line](<#/doc/utility/stacktrace_entry/source_line>) | obtém o número da linha que relaciona lexicalmente a avaliação representada pelo `stacktrace_entry`
(função membro pública de `std::stacktrace_entry`)
[ Informações de nome de arquivo e linha](<#/doc/preprocessor/line>)