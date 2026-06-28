# std::optional&lt;T&gt;::reset

```cpp
void reset() noexcept;
```
```cpp
|  // (desde C++17)
| | | (constexpr desde C++20)
```

Se *this contiver um valor, destrói esse valor como se por `value().T::~T()`. Caso contrário, não há efeitos.

*this não contém um valor após esta chamada.

### Notas

```cpp
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_lib_optional` | `202106L`  // (C++20)
(DR20) | Totalmente constexpr
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <optional>
     
    struct A
    {
        std::string s;
        A(std::string str) : s(std::move(str)) { std::cout << " constructed\n"; }
        ~A() { std::cout << " destructed\n"; }
        A(const A& o) : s(o.s) { std::cout << " copy constructed\n"; }
        A(A&& o) : s(std::move(o.s)) { std::cout << " move constructed\n"; }
     
        A& operator=(const A& other)
        {
            s = other.s;
            std::cout << " copy assigned\n";
            return *this;
        }
     
        A& operator=(A&& other)
        {
            s = std::move(other.s);
            std::cout << " move assigned\n";
            return *this;
        }
    };
     
    int main()
    {
        std::cout << "Create empty optional:\n";
        std::optional<A> opt;
     
        std::cout << "Construct and assign value:\n";
        opt = A("Lorem ipsum dolor sit amet, consectetur adipiscing elit nec.");
     
        std::cout << "Reset optional:\n";
        opt.reset();
        std::cout << "End example\n";
    }
```

Saída:
```
    Create empty optional:
    Construct and assign value:
     constructed
     move constructed
     destructed
    Reset optional:
     destructed
    End example
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20 | `reset` não era constexpr enquanto a destruição não trivial é permitida em constexpr em C++20 | tornada constexpr

### Veja também

[ operator=](<#/>) | atribui conteúdo
(função membro pública)