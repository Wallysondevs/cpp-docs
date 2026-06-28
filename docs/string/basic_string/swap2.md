# std::swap(std::basic_string)

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
template< class CharT, class Traits, class Alloc >
void swap( std::basic_string<CharT, Traits, Alloc>& lhs,
std::basic_string<CharT, Traits, Alloc>& rhs );
template< class CharT, class Traits, class Alloc >
void swap( std::basic_string<CharT, Traits, Alloc>& lhs,
std::basic_string<CharT, Traits, Alloc>& rhs ) noexcept(/* see below */);
(constexpr desde C++20)
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::basic_string](<#/doc/string/basic_string>). Troca o conteúdo de lhs e rhs.

Equivalente a lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — strings cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exceções

```cpp
Especificação `noexcept`: `noexcept(noexcept(lhs.swap(rhs)))`  // (desde C++17)
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string a = "AAA";
        std::string b = "BBBB";
    
        std::cout << "Before swap:\n"
                     "a = " << a << "\n"
                     "b = " << b << "\n\n";
    
        std::swap(a, b);
    
        std::cout << "After swap:\n"
                     "a = " << a << "\n"
                     "b = " << b << '\n';
    }
```

Saída:
```
    Before swap:
    a = AAA
    b = BBBB
    
    After swap:
    a = BBBB
    b = AAA
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2064](<https://cplusplus.github.io/LWG/issue2064>) | C++11 | `swap` não-membro era noexcept e inconsistente com `swap` membro | noexcept removido

### Veja também

[ swap](<#/doc/string/basic_string/swap>) | troca o conteúdo
(função membro pública)