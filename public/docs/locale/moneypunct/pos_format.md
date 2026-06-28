# std::moneypunct&lt;CharT,International&gt;::pos_format, do_pos_format, neg_format, do_neg_format

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
pattern pos_format() const;
public:
pattern neg_format() const;
protected:
virtual pattern do_pos_format() const;
protected:
virtual pattern do_neg_format() const;
```

1) Função membro pública, chama a função membro `do_pos_format` da classe mais derivada.

2) Função membro pública, chama a função membro `do_neg_format` da classe mais derivada.

3) Retorna a estrutura de formato (do tipo [`std::money_base::format`](<#/doc/locale/money_base>)) que descreve a formatação de valores monetários positivos.

4) Retorna a estrutura de formato (do tipo [`std::money_base::format`](<#/doc/locale/money_base>)) que descreve a formatação de valores monetários negativos.

As especializações padrão de [std::moneypunct](<#/doc/locale/moneypunct>) retornam o padrão {symbol, sign, none, value}.

### Valor de retorno

O objeto do tipo [`std::money_base::format`](<#/doc/locale/money_base>) descrevendo a formatação usada por esta locale.

### Observações

Enquanto [std::money_put](<#/doc/locale/money_put>) usa `pos_format` para formatar valores positivos e `neg_format` para formatar valores negativos, [std::money_get](<#/doc/locale/money_get>) usa `neg_format` para analisar todos os valores monetários: ele assume que `neg_format` é compatível com `pos_format`.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    
    struct my_punct : std::moneypunct_byname<char, false>
    {
        my_punct(const char* name) : moneypunct_byname(name) {}
        pattern do_pos_format() const { return {value, space, symbol, sign}; }
        pattern do_neg_format() const { return {value, space, symbol, sign}; }
    };
    
    int main()
    {
        std::cout.imbue(std::locale("en_US.utf8"));
        std::cout << "american locale: " << std::showbase
                  << std::put_money(12345678.0) << '\n';
    
        std::cout.imbue(std::locale(std::cout.getloc(), new my_punct("en_US.utf8")));
        std::cout << "locale with modified moneypunct:\n"
                  << std::put_money(12345678.0) << '\n'
                  << std::put_money(-12345678.0) << '\n';
    }
```

Saída:
```
    american locale: $123,456.78
    locale with modified moneypunct:
    123,456.78 $
    123,456.78 $-
```

### Ver também

[ do_curr_symbol](<#/doc/locale/moneypunct/curr_symbol>)[virtual] | fornece a string a ser usada como identificador de moeda
(função membro virtual protegida)
[ do_positive_signdo_negative_sign](<#/doc/locale/moneypunct/positive_sign>)[virtual] | fornece a string para indicar um valor positivo ou negativo
(função membro virtual protegida)
[ do_get](<#/doc/locale/money_get/get>)[virtual] | analisa um valor monetário de um fluxo de entrada
(função membro virtual protegida de `std::money_get<CharT,InputIt>`)
[ do_put](<#/doc/locale/money_put/put>)[virtual] | formata um valor monetário e escreve para o fluxo de saída
(função membro virtual protegida de `std::money_put<CharT,OutputIt>`)