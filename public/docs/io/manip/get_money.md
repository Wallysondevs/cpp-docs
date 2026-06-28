# std::get_money

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
template< class MoneyT >
/*unspecified*/ get_money( MoneyT& mon, bool intl = false );
```

Quando usado em uma expressão `in >> get_money(mon, intl)`, analisa a entrada de caracteres como um valor monetário, conforme especificado pela facet `[std::money_get](<#/doc/locale/money_get>)` da locale atualmente imbuída em `in`, e armazena o valor em `mon`.

A operação de extração `in >> get_money(mon, intl)` se comporta como uma `[FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>)`.

### Parâmetros

- **mon** — variável onde o valor monetário será escrito. Pode ser `long double` ou `[std::basic_string](<#/doc/string/basic_string>)`
- **intl** — espera encontrar strings de moeda internacionais necessárias se `true`, espera símbolos de moeda opcionais caso contrário

### Valor de retorno

Um objeto de tipo não especificado tal que

  * se `in` for um objeto do tipo `[std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>`, a expressão `in >> get_money(mon, intl)`
    * tem o tipo `[std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>&`
    * tem o valor `in`
    * se comporta como se chamasse `f(in, mon, intl)`

onde a função `f` é definida como:
```cpp
    template<class CharT, class Traits, class MoneyT>
    void f(std::basic_ios<CharT, Traits>& str, MoneyT& mon, bool intl)
    {
        using Iter = std::istreambuf_iterator<CharT, Traits>;
        using MoneyGet = std::money_get<CharT, Iter>;
    
        std::ios_base::iostate err = std::ios_base::goodbit;
        const MoneyGet& mg = std::use_facet<MoneyGet>(str.getloc());
    
        mg.get(Iter(str.rdbuf()), Iter(), intl, str, err, mon);
    
        if (err != std::ios_base::goodbit)
            str.setstate(err);
    }
```

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <sstream>
    
    int main()
    {
        std::istringstream in("$1,234.56 2.22 USD  3.33");
        long double v1, v2;
        std::string v3;
    
        in.imbue(std::locale("en_US.UTF-8"));
        in >> std::get_money(v1) >> std::get_money(v2) >> std::get_money(v3, true);
    
        if (in)
            std::cout << std::quoted(in.str()) << " parsed as: "
                      << v1 << ", " << v2 << ", " << v3 << '\n';
        else
            std::cout << "Parse failed";
    }
```

Saída:
```
    "$1,234.56 2.22 USD  3.33" parsed as: 123456, 222, 333
```

### Veja também

[ money_get](<#/doc/locale/money_get>) | analisa e constrói um valor monetário a partir de uma sequência de caracteres de entrada
(modelo de classe)
[ put_money](<#/doc/io/manip/put_money>)(C++11) | formata e exibe um valor monetário
(modelo de função)