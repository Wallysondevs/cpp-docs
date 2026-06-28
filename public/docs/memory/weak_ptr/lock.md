# std::weak_ptr&lt;T&gt;::lock

```cpp
std::shared_ptr<T> lock() const noexcept;  // (desde C++11)
```

Cria um novo [std::shared_ptr](<#/doc/memory/shared_ptr>) que compartilha a propriedade do objeto gerenciado. Se não houver objeto gerenciado, ou seja, *this estiver vazio, então o `shared_ptr` retornado também estará vazio.

Efetivamente retorna `expired() ? shared_ptr<T>() : shared_ptr<T>(*this)`, executado atomicamente.

### Parâmetros

(nenhum)

### Valor de retorno

Um `shared_ptr` que compartilha a propriedade do objeto possuído se [std::weak_ptr::expired](<#/doc/memory/weak_ptr/expired>) retornar `false`. Caso contrário, retorna um `shared_ptr` default-construído do tipo `T`.

### Notas

Tanto esta função quanto o construtor de [std::shared_ptr](<#/doc/memory/shared_ptr>) podem ser usados para adquirir propriedade temporária do objeto gerenciado referenciado por um `std::weak_ptr`. A diferença é que o construtor de [std::shared_ptr](<#/doc/memory/shared_ptr>) lança uma exceção quando seu argumento `std::weak_ptr` está vazio, enquanto `std::weak_ptr<T>::lock()` constrói um `std::shared_ptr<T>` vazio.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    void observe(std::weak_ptr<int> weak)
    {
        if (auto p = weak.lock())
            std::cout << "\tobserve() is able to lock weak_ptr<>, value=" << *p << '\n';
        else
            std::cout << "\tobserve() is unable to lock weak_ptr<>\n";
    }
    
    int main()
    {
        std::weak_ptr<int> weak;
        std::cout << "weak_ptr<> is not yet initialized\n";
        observe(weak);
    
        {
            auto shared = std::make_shared<int>(42);
            weak = shared;
            std::cout << "weak_ptr<> is initialized with shared_ptr\n";
            observe(weak);
        }
    
        std::cout << "shared_ptr<> has been destructed due to scope exit\n";
        observe(weak);
    }
```

Saída:
```
    weak_ptr<> is not yet initialized
            observe() is unable to lock weak_ptr<>
    weak_ptr<> is initialized with shared_ptr
            observe() is able to lock weak_ptr<>, value=42
    shared_ptr<> has been destructed due to scope exit
            observe() is unable to lock weak_ptr<>
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2316](<https://cplusplus.github.io/LWG/issue2316>) | C++11 | `lock()` não era exigido ser atômico, mas exigido ser `noexcept`, o que levava a uma contradição | especificado para ser atômico

### Veja também

[ expired](<#/doc/memory/weak_ptr/expired>) | verifica se o objeto referenciado já foi excluído
(função membro pública)