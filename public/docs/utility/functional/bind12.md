# std::bind1st, std::bind2nd

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class F, class T >
std::binder1st<F> bind1st( const F& f, const T& x );
(removido desde C++17)
template< class F, class T >
std::binder2nd<F> bind2nd( const F& f, const T& x );
(removido desde C++17)
```

Associa um dado argumento x ao primeiro ou segundo parâmetro do objeto de função binária f fornecido. Ou seja, armazena x dentro do wrapper resultante, que, se chamado, passa x como o primeiro ou o segundo parâmetro de f.

1) Associa o primeiro argumento de f a x. Efetivamente chama [std::binder1st](<#/doc/utility/functional/binder12>)&lt;F&gt;(f, typename F::first_argument_type(x)).

2) Associa o segundo argumento de f a x. Efetivamente chama [std::binder2nd](<#/doc/utility/functional/binder12>)&lt;F&gt;(f, typename F::second_argument_type(x)).

### Parâmetros

- **f** — ponteiro para uma função à qual um argumento será associado
- **x** — argumento a ser associado a f

### Valor de retorno

Um objeto de função que encapsula f e x.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <cstddef>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<double> a = {0, 30, 45, 60, 90, 180};
        std::vector<double> r(a.size());
        const double pi = std::acos(-1); // since C++20 use std::numbers::pi
    
        std::transform(a.begin(), a.end(), r.begin(),
            std::bind1st(std::multiplies<double>(), pi / 180.0));
    //  an equivalent lambda is: pi { return a * pi / 180.0; });
    
        for (std::size_t n = 0; n < a.size(); ++n)
            std::cout << std::setw(3) << a[n] << "° = " << std::fixed << r[n]
                      << " rad\n" << std::defaultfloat;
    }
```

Saída:
```
      0° = 0.000000 rad
     30° = 0.523599 rad
     45° = 0.785398 rad
     60° = 1.047198 rad
     90° = 1.570796 rad
    180° = 3.141593 rad
```

### Veja também

[ binder1stbinder2nd](<#/doc/utility/functional/binder12>)(obsoleto desde C++11)(removido desde C++17) | objeto de função que contém uma função binária e um de seus argumentos
(modelo de classe)
[ bind_frontbind_back](<#/doc/utility/functional/bind_front>)(C++20)(C++23) | associa um número variável de argumentos, em ordem, a um objeto de função
(modelo de função)