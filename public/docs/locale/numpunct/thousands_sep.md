# std::numpunct&lt;CharT&gt;::thousands_sep, do_thousands_sep

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
char_type thousands_sep() const;
protected:
virtual char_type do_thousands_sep() const;
```

1) Função membro pública, chama a função membro `do_thousands_sep` da classe mais derivada.

2) Retorna o caractere a ser usado como separador entre grupos de dígitos ao analisar ou formatar inteiros e partes integrais de valores de ponto flutuante.

### Valor de retorno

O objeto do tipo `char_type` a ser usado como separador de milhares. As especializações padrão de `std::numpunct` retornam ',' e L','.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    struct space_out : std::numpunct<char>
    {
        char do_thousands_sep()   const { return ' '; }  // separate with spaces
        std::string do_grouping() const { return "\1"; } // groups of 1 digit
    };
     
    int main()
    {
        std::cout << "default locale: " << 12345678 << '\n';
        std::cout.imbue(std::locale(std::cout.getloc(), new space_out));
        std::cout << "locale with modified numpunct: " << 12345678 << '\n';
    }
```

Saída:
```
    default locale: 12345678
    locale with modified numpunct: 1 2 3 4 5 6 7 8
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 20](<https://cplusplus.github.io/LWG/issue20>) | C++98 | o tipo de retorno era `string_type` | alterado para `char_type`

### Veja também

[ do_grouping](<#/doc/locale/numpunct/grouping>)[virtual] | fornece o número de dígitos entre cada par de separadores de milhares
(função membro virtual protegida)