# std::put_money

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
template< class MoneyT >
/*unspecified*/ put_money( const MoneyT& mon, bool intl = false );
```

Quando usado em uma expressão `out << put_money(mon, intl)`, converte o valor monetário `mon` para sua representação em caracteres conforme especificado pelo facet [std::money_put](<#/doc/locale/money_put>) do locale atualmente imbuído em `out`.

A operação de inserção em `out << put_money(mon, intl)` comporta-se como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>).

### Parâmetros

- **mon** — um valor monetário, seja long double ou [std::basic_string](<#/doc/string/basic_string>)
- **intl** — usa strings de moeda internacional se true, usa símbolos de moeda caso contrário

### Valor de retorno

Um objeto de tipo não especificado tal que

*   se `out` é um objeto do tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, a expressão `out << put_money(mon, intl)`
    *   tem tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>&
    *   tem valor `out`
    *   comporta-se como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>) que chama `f(out, mon, intl)`

onde a função `f` é definida como:
```cpp
    template<class CharT, class Traits, class MoneyT>
    void f(std::basic_ios<CharT, Traits>& str, const MoneyT& mon, bool intl)
    {
        using Iter = std::ostreambuf_iterator<CharT, Traits>;
        using MoneyPut = std::money_put<CharT, Iter>;
    
        const MoneyPut& mp = std::use_facet<MoneyPut>(str.getloc());
        const Iter end = mp.put(Iter(str.rdbuf()), intl, str, str.fill(), mon);
    
        if (end.failed())
            str.setstate(std::ios_base::badbit);
    }
```

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        long double mon = 123.45; // or std::string mon = "123.45";
    
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << std::showbase
                  << "en_US: " << std::put_money(mon)
                  << " or " << std::put_money(mon, true) << '\n';
    
        std::cout.imbue(std::locale("ru_RU.UTF-8"));
        std::cout << "ru_RU: " << std::put_money(mon)
                  << " or " << std::put_money(mon, true) << '\n';
    
        std::cout.imbue(std::locale("ja_JP.UTF-8"));
        std::cout << "ja_JP: " << std::put_money(mon)
                  << " or " << std::put_money(mon, true) << '\n';
    }
```

Saída possível:
```
    en_US: $1.23 or USD  1.23
    ru_RU: 1.23 руб or 1.23 RUB 
    ja_JP: ￥123 or JPY  123
```

### Ver também

[ money_put](<#/doc/locale/money_put>) | formata um valor monetário para saída como uma sequência de caracteres
(modelo de classe)
[ get_money](<#/doc/io/manip/get_money>)(C++11) | analisa um valor monetário
(modelo de função)