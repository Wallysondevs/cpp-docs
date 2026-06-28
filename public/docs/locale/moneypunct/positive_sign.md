# std::moneypunct&lt;CharT,International&gt;::positive_sign, do_positive_sign, negative_sign, do_negative_sign

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
string_type positive_sign() const;
public:
string_type negative_sign() const;
protected:
virtual string_type do_positive_sign() const;
protected:
virtual string_type do_negative_sign() const;
```

1) Função membro pública, chama a função membro `do_positive_sign` da classe mais derivada.

2) Função membro pública, chama a função membro `do_negative_sign` da classe mais derivada.

3) Retorna a string que é usada para formatar valores monetários positivos.

4) Retorna a string que é usada para formatar valores monetários negativos.

Apenas o primeiro caractere da string retornada é o caractere que aparece na posição `[pos_format()](<#/doc/locale/moneypunct/pos_format>)`/`[neg_format()](<#/doc/locale/moneypunct/pos_format>)` indicada pelo sinal do valor. O restante dos caracteres aparece _depois_ do restante da string monetária.

Em particular, para `negative_sign` de "-", a formatação pode aparecer como "-1.23 €", enquanto para `negative_sign` de "()" apareceria como "(1.23 €)".

### Valor de retorno

A string do tipo `string_type` contendo os caracteres a serem usados como sinal positivo ou negativo.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    
    struct my_punct : std::moneypunct_byname<char, false>
    {
        my_punct(const char* name) : moneypunct_byname(name) {}
        string_type do_negative_sign() const { return "()"; }
    };
    
    int main()
    {
        std::locale loc("de_DE.utf8");
        std::cout.imbue(loc);
        std::cout << loc.name() << " negative sign is '"
                  << std::use_facet<std::moneypunct<char>>(loc).negative_sign()
                  << "' for example: " << std::showbase << std::put_money(-1234) << '\n';
    
        std::locale loc2("ms_MY.utf8");
        std::cout.imbue(loc2);
        std::cout << loc2.name() << " negative sign is '"
                  << std::use_facet<std::moneypunct<char>>(loc2).negative_sign()
                  << "' for example: " << std::put_money(-1234) << '\n';
    
        std::cout.imbue(std::locale>(std::cout.getloc(), new my_punct("de_DE.utf8")));
        std::cout << "de_DE.utf8 with negative_sign set to \"()\": "
                  << std::put_money(-1234) << '\n';
    }
```

Saída:
```
    de_DE.utf8 negative sign is '-' for example: -12,34 €
    ms_MY.utf8 negative sign is '()' for example: (RM12.34)
    de_DE.utf8 with negative_sign set to "()": (12,34 €)
```

### Veja também

```cpp
 do_pos_formatdo_neg_format[virtual] | fornece o padrão de formatação para valores monetários
(função membro virtual protegida)
```