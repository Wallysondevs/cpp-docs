# std::moneypunct&lt;CharT,International&gt;::thousands_sep, do_thousands_sep

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
char_type thousands_sep() const;
protected:
virtual char_type do_thousands_sep() const;
```

1) Função membro pública, chama a função membro `do_thousands_sep` da classe mais derivada.

2) Retorna o caractere a ser usado como separador entre grupos de dígitos ao analisar ou formatar as partes inteiras de valores monetários.

### Valor de retorno

O objeto do tipo `char_type` a ser usado como separador de milhares. Em locales comuns dos EUA, este é ',' ou L','.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <locale>
    
    struct space_out : std::moneypunct<char>
    {
        pattern do_pos_format() const { return {value, none, none, none}; }
        int do_frac_digits() const { return 0; }
        char_type do_thousands_sep() const { return ' '; }
        string_type do_grouping() const { return "\002"; }
    };
    
    int main()
    {
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << "american locale: " << std::showbase
                  << std::put_money(12345678.0) << '\n';
    
        std::cout.imbue(std::locale(std::cout.getloc(), new space_out));
        std::cout << "locale with modified moneypunct: "
                  << std::put_money(12345678.0) << '\n';
    }
```

Saída:
```
    american locale: $123,456.78
    locale with modified moneypunct: 12 34 56 78
```

### Veja também

```cpp
 do_grouping[virtual] | fornece o número de dígitos entre cada par de separadores de milhares
(função membro virtual protegida)
```
---