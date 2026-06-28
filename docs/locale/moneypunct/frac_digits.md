# std::moneypunct&lt;CharT,International&gt;::frac_digits, do_frac_digits

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
int frac_digits() const;
protected:
virtual int do_frac_digits() const;
```

1) Função membro pública, chama a função membro `do_frac_digits` da classe mais derivada.

2) Retorna o número de dígitos a serem exibidos após o ponto decimal ao imprimir valores monetários.

### Valor de retorno

O número de dígitos a serem exibidos após o ponto decimal. Em locales comuns dos EUA, este é o valor 2.

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
        std::cout.imbue(std::locale>("en_US.UTF-8"));
        std::cout << "american locale: " << std::showbase
                  << std::put_money(12345678.0) << '\n';
    
        std::cout.imbue(std::locale>(std::cout.getloc(), new space_out));
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

[ do_thousands_sep](<#/doc/locale/moneypunct/thousands_sep>)[virtual] | fornece o caractere a ser usado como separador de milhares
(função membro virtual protegida)
[ do_decimal_point](<#/doc/locale/moneypunct/decimal_point>)[virtual] | fornece o caractere a ser usado como ponto decimal
(função membro virtual protegida)