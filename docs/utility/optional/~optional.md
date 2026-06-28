# std::optional&lt;T&gt;::~optional

```cpp
~optional();  // (desde C++17)
(constexpr desde C++20)
```

Se o objeto contém um valor e o tipo `T` não é trivialmente destrutível (veja [std::is_trivially_destructible](<#/doc/types/is_destructible>)), destrói o valor contido chamando seu destrutor, como se por value().T::~T().

Caso contrário, não faz nada.

### Notas

Se `T` é trivialmente destrutível, então este destrutor também é trivial, portanto [std::optional](<#/doc/utility/optional>)&lt;T&gt; também é trivialmente destrutível.

```cpp
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_lib_optional` | `202106L`  // (C++20)
(DR20) | Totalmente constexpr
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20 | o destrutor não era constexpr enquanto destrutores não-triviais podem ser constexpr em C++20 | tornou-se constexpr