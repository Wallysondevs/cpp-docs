# std::swap(std::any)

Definido no header `[<any>](<#/doc/header/any>)`

```cpp
void swap( any& lhs, any& rhs ) noexcept;  // (desde C++17)
```

Sobrecarga o algoritmo `[std::swap](<#/doc/utility/swap>)` para `[std::any](<#/doc/utility/any>)`. Troca o conteúdo de dois objetos `any` chamando lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — objetos a serem trocados

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <print>
    #include <string>
    
    int main()
    {
        std::any p = 42, q = std::string{"Bishop"};
        std::println("p: {}, q: {}", std::any_cast<int>(p), std::any_cast<std::string&>(q));
        std::println("swap(p, q)");
        std::swap(p, q);
        std::println("p: {}, q: {}", std::any_cast<std::string&>(p), std::any_cast<int>(q));
    }
```

Saída:
```
    p: 42, q: Bishop
    swap(p, q)
    p: Bishop, q: 42
```

### Veja também

[`swap`](<#/doc/utility/any/swap>) | troca dois objetos `any`
(função membro pública)