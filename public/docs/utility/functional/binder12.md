# std::binder1st, std::binder2nd

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class Fn >
class binder1st
: public std::unary_function<typename Fn::second_argument_type,
typename Fn::result_type> {
protected:
Fn op;
typename Fn::first_argument_type value;
public:
binder1st( const Fn& fn,
const typename Fn::first_argument_type& value );
```

typename Fn::result_type
operator()(const typename Fn::second_argument_type& x) const;

typename Fn::result_type
operator()(typename Fn::second_argument_type& x) const;
}; | (1) | (obsoleto desde C++11)
(removido em C++17)
template< class Fn >
class binder2nd
: public [std::unary_function](<#/doc/utility/functional/unary_function>)&lt;typename Fn::first_argument_type,
typename Fn::result_type&gt; {
protected:
Fn op;
typename Fn::second_argument_type value;
public:
binder2nd( const Fn& fn,
const typename Fn::second_argument_type& value );

typename Fn::result_type
operator()(const typename Fn::first_argument_type& x) const;

typename Fn::result_type
operator()(typename Fn::first_argument_type& x) const;
}; | (2) | (obsoleto desde C++11)
(removido em C++17)

Um objeto de função que vincula um argumento a uma função binária.

O valor do parâmetro é passado para o objeto no momento da construção e armazenado dentro do objeto. Sempre que o objeto de função é invocado através de `operator()`, o valor armazenado é passado como um dos argumentos, o outro argumento é passado como um argumento de `operator()`. O objeto de função resultante é uma função unária.

1) Vincula o primeiro parâmetro ao valor `value` fornecido na construção do objeto.

2) Vincula o segundo parâmetro ao valor `value` fornecido na construção do objeto.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <functional>
    #include <iostream>
    #include <vector>
     
    const double pi = std::acos(-1); // use std::numbers::pi em C++20
     
    int main()
    {
        // obsoleto desde C++11, removido em C++17
        auto f1 = std::bind1st(std::multiplies<double>(), pi / 180.0);
     
        // substituição em C++11
        auto f2 =  { return a * pi / 180.0; };
     
        for (double n : {0, 30, 45, 60, 90, 180})
            std::cout << n << "°\t" << std::fixed << "= "
                      << f1(n) << " rad (using binder)\t= "
                      << f2(n) << " rad (using lambda)\n"
                      << std::defaultfloat;
    }
```

Saída:
```
    0°	= 0.000000 rad (using binder)	= 0.000000 rad (using lambda)
    30°	= 0.523599 rad (using binder)	= 0.523599 rad (using lambda)
    45°	= 0.785398 rad (using binder)	= 0.785398 rad (using lambda)
    60°	= 1.047198 rad (using binder)	= 1.047198 rad (using lambda)
    90°	= 1.570796 rad (using binder)	= 1.570796 rad (using lambda)
    180°	= 3.141593 rad (using binder)	= 3.141593 rad (using lambda)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 109](<https://cplusplus.github.io/LWG/issue109>) | C++98 | `operator()` não podia modificar o argumento passado a ele | adicionadas sobrecargas para lidar com isso

### Veja também

[ bind1stbind2nd](<#/doc/utility/functional/bind12>)(obsoleto desde C++11)(removido em C++17) | vincula um argumento a uma função binária
(modelo de função)