# std::chrono::duration&lt;Rep,Period&gt;::zero

```cpp
static constexpr duration zero();  // (até C++20)
static constexpr duration zero() noexcept;  // (desde C++20)
```

Retorna uma duration de comprimento zero.

Se a representação `rep` da duration exigir alguma outra implementação para retornar uma duration de comprimento zero, [std::chrono::duration_values](<#/doc/chrono/duration_values>) pode ser especializada para retornar o valor desejado.

### Parâmetros

(nenhum)

### Valor de retorno

Retorna duration([std::chrono::duration_values](<#/doc/chrono/duration_values>)&lt;rep&gt;::zero()).

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <ratio>
     
    template<typename X, typename Y>
    using dura = std::chrono::duration<X, Y>;
     
    static_assert
    (
        (std::chrono::hours::zero() == std::chrono::nanoseconds::zero()) &&
        (dura<short, std::nano>::zero() == dura<int, std::deci>::zero()) &&
        (dura<short, std::deca>::zero() == dura<long, std::exa>::zero()) &&
        (dura<long, std::atto>::zero().count() == dura<float, std::exa>::zero().count())
    );
     
    int main() {}
```

### Veja também

[ min](<#/doc/chrono/duration/min>)[static] | retorna o valor especial de duration min
---|---
(função membro estática pública) |
[ max](<#/doc/chrono/duration/max>)[static] | retorna o valor especial de duration max
(função membro estática pública) |