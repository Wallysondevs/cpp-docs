# std::moneypunct&lt;CharT,International&gt;::curr_symbol, do_curr_symbol

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
string_type curr_symbol() const;
protected:
virtual string_type do_curr_symbol() const;
```

1) Função membro pública, chama a função membro `do_curr_symbol` da classe mais derivada.

2) Retorna a string usada como identificador de moeda por esta locale. Se `International` (o segundo parâmetro de template de `std::moneypunct`) for `false`, o identificador é geralmente um único caractere (wide), como "￥" ou "$". Se `International` for `true`, o identificador é geralmente uma string de quatro caracteres contendo o código de moeda [ISO 4217](<https://en.wikipedia.org/wiki/ISO_4217> "enwiki:ISO 4217") de três caracteres seguido por um espaço ("JPY " ou "USD ").

### Valor de retorno

O objeto do tipo `string_type` contendo o símbolo ou código da moeda.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    void show_ccy(const char* locname)
    {
        std::locale loc(locname);
        std::cout << locname << " currency symbol is "
                  << std::use_facet<std::moneypunct<char, true>>(loc).curr_symbol()
                  << "or " << std::use_facet<std::moneypunct<char>>(loc).curr_symbol()
                  << " for short\n";
    }
    
    int main()
    {
        show_ccy("en_US.utf8");
        show_ccy("ja_JP.utf8");
        show_ccy("sv_SE.utf8");
        show_ccy("ru_RU.utf8");
        show_ccy("vi_VN.utf8");
    }
```

Saída:
```
    en_US.utf8 currency symbol is USD or $ for short
    ja_JP.utf8 currency symbol is JPY or ￥ for short
    sv_SE.utf8 currency symbol is SEK or kr for short
    ru_RU.utf8 currency symbol is RUB or руб for short
    vi_VN.utf8 currency symbol is VND or ₫ for short
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 666](<https://cplusplus.github.io/LWG/issue666>) | C++98 | o comprimento da string identificadora era exigido ser 4 se `International` fosse true | não exigido

### Veja também

[ do_pos_formatdo_neg_format](<#/doc/locale/moneypunct/pos_format>)[virtual] | fornece o padrão de formatação para valores monetários
(função membro virtual protegida)