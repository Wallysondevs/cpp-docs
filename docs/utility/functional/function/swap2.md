# std::swap(std::function)

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class R, class... Args >
void swap( std::function<R(Args...)>& lhs, std::function<R(Args...)>& rhs ) noexcept;
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::function](<#/doc/utility/functional/function>). Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`.

### Parâmetros

- **lhs, rhs** — wrappers de função polimórficos cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```
    #include <functional>
    #include <iostream>
    
    void foo(const char* str, int x)
    {
        std::cout << "foo(\"" << str << "\", " << x << ")\n";
    }
    
    void bar(const char* str, int x)
    {
        std::cout << "bar(\"" << str << "\", " << x << ")\n";
    }
    
    int main()
    {
        std::function<void(const char*, int)> f1{foo};
        std::function<void(const char*, int)> f2{bar};
    
        f1("f1", 1);
        f2("f2", 2);
    
        std::cout << "std::swap(f1, f2);\n";
        std::swap(f1, f2);
    
        f1("f1", 1);
        f2("f2", 2);
    }
```

Saída:
```
    foo("f1", 1)
    bar("f2", 2)
    std::swap(f1, f2);
    bar("f1", 1)
    foo("f2", 2)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2062](<https://cplusplus.github.io/LWG/issue2062>) | C++11 | sobrecarga de `swap` para `function` não era exigida como `noexcept` | exigido

### Veja também

[ swap](<#/doc/utility/functional/function/swap>) | troca o conteúdo
(função membro pública)
[ swap(std::move_only_function)](<#/doc/utility/functional/move_only_function/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)