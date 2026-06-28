# std::make_pair

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T1, class T2 >
std::pair<T1, T2> make_pair( T1 x, T2 y );
template< class T1, class T2 >
std::pair</*V1*/, /*V2*/> make_pair( T1&& x, T2&& y );
(constexpr desde C++14)
(até C++20)
template< class T1, class T2 >
constexpr std::pair<std::unwrap_ref_decay_t<T1>,
std::unwrap_ref_decay_t<T2>>
make_pair( T1&& x, T2&& y );
```

Cria um objeto [std::pair](<#/doc/utility/pair>), deduzindo o tipo de destino a partir dos tipos dos argumentos.

Dados os tipos [std::decay](<#/doc/types/decay>)&lt;T1&gt;::type como `U1` e [std::decay](<#/doc/types/decay>)&lt;T2&gt;::type como `U2`, os tipos /*V1*/ e /*V2*/ são definidos da seguinte forma:

*   Se `U1` for [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;X&gt;, /*V1*/ é `X&`; caso contrário, /*V1*/ é `U1`.
*   Se `U2` for [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;Y&gt;, /*V2*/ é `Y&`; caso contrário, /*V2*/ é `U2`.

| (desde C++11)
(até C++20)

### Parâmetros

- **x, y** — os valores a partir dos quais o par será construído

### Valor de retorno

[std::pair](<#/doc/utility/pair>)<T1, T2>(x, y) | (até C++11)
---|---
[std::pair](<#/doc/utility/pair>)</*V1*/, /*V2*/>([std::forward](<#/doc/utility/forward>)&lt;T1&gt;(x), [std::forward](<#/doc/utility/forward>)&lt;T2&gt;(y)) | (desde C++11)
(até C++20)
[std::pair](<#/doc/utility/pair>)<[std::unwrap_ref_decay_t](<#/doc/utility/functional/unwrap_reference>)&lt;T1&gt;, [std::unwrap_ref_decay_t](<#/doc/utility/functional/unwrap_reference>)&lt;T2&gt;>
([std::forward](<#/doc/utility/forward>)&lt;T1&gt;(x), [std::forward](<#/doc/utility/forward>)&lt;T2&gt;(y)) | (desde C++20)

### Exemplo

Execute este código
```
    #include <functional>
    #include <iostream>
    #include <utility>
     
    int main()
    {
        int n = 1;
        int a[5] = {1, 2, 3, 4, 5};
     
        // constrói um par a partir de dois inteiros
        auto p1 = std::make_pair(n, a[1]);
        std::cout << "O valor de p1 é "
                  << '(' << p1.first << ", " << p1.second << ")\n";
     
        // constrói um par a partir de uma referência para int e um array (decai para ponteiro)
        auto p2 = std::make_pair(std::ref(n), a);
        n = 7;
        std::cout << "O valor de p2 é "
                  << '(' << p2.first << ", " << *(p2.second + 2) << ")\n";
    }
```

Saída:
```
    The value of p1 is (1, 2)
    The value of p2 is (7, 3)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 181](<https://cplusplus.github.io/LWG/issue181>) | C++98 | os tipos dos parâmetros eram tipos de referência const, o que tornava a passagem de arrays impossível | alterou esses tipos para tipos de valor