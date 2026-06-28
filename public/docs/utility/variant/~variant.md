# std::variant&lt;Types...&gt;::~variant

```cpp
~variant();  // (desde C++17)
(constexpr desde C++20)
```

  
Se [`valueless_by_exception()`](<#/doc/utility/variant/valueless_by_exception>) for true, não faz nada. Caso contrário, destrói o objeto atualmente contido.

Este destrutor é trivial se [std::is_trivially_destructible_v](<#/doc/types/is_destructible>)<T_i> for true para todos os `T_i` em `Types...`.

### Notas

```cpp
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_lib_variant` | `202106L`  // (C++20)
(DR) | `std::variant` totalmente constexpr
```
  
### Exemplo

Execute este código
```
    #include <cstdio>
    #include <variant>
     
    int main()
    {
        struct X { ~X() { puts("X::~X();"); } };
        struct Y { ~Y() { puts("Y::~Y();"); } };
     
        {
            puts("entering block #1");
            std::variant<X,Y> var;
            puts("leaving block #1");
        }
     
        {
            puts("entering block #2");
            std::variant<X,Y> var{ std::in_place_index_t<1>{} }; // constructs var(Y)
            puts("leaving block #2");
        }
    }
```

Saída: 
```
    entering block #1
    leaving block #1
    X::~X();
    entering block #2
    leaving block #2
    Y::~Y();
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20  | o destrutor não era constexpr enquanto destrutores não triviais podem ser constexpr em C++20  | tornou-se constexpr