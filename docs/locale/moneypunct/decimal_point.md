# std::moneypunct&lt;CharT,International&gt;::decimal_point, do_decimal_point

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
CharT decimal_point() const;
protected:
virtual CharT do_decimal_point() const;
```

1) Função membro pública, chama a função membro `do_decimal_point` da classe mais derivada.

2) Retorna o caractere a ser usado como separador de ponto decimal em I/O monetário se o formato usa frações (isto é, se [do_frac_digits()](<#/doc/locale/moneypunct/frac_digits>) for maior que zero). Para localidades típicas dos EUA, é o caractere '.' (ou L'.').

### Valor de retorno

O objeto do tipo `CharT` contendo o caractere do ponto decimal.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    
    void show_dpt(const char* locname)
    {
        std::locale loc(locname);
        std::cout.imbue(loc);
        std::cout << locname << " decimal point is '"
                  << std::use_facet<std::moneypunct<char>>(loc).decimal_point()
                  << "' for example: " << std::showbase << std::put_money(123);
        if (std::use_facet<std::moneypunct<char>>(loc).frac_digits() == 0)
            std::cout << " (does not use frac digits)";
    
        std::cout << '\n';
    }
    
    int main()
    {
        show_dpt("en_US.utf8");
        show_dpt("ja_JP.utf8");
        show_dpt("sv_SE.utf8");
        show_dpt("de_DE.utf8");
    }
```

Saída:
```
    en_US.utf8 decimal point is '.' for example: $1.23
    ja_JP.utf8 decimal point is '.' for example: ￥123 (does not use frac digits)
    sv_SE.utf8 decimal point is ',' for example: 1,23 kr
    de_DE.utf8 decimal point is ',' for example: 1,23 €
```

### Veja também

[ do_frac_digits](<#/doc/locale/moneypunct/frac_digits>)[virtual] | fornece o número de dígitos a serem exibidos após o ponto decimal
(função membro virtual protegida)