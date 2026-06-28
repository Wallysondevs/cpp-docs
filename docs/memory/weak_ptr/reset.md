# std::weak_ptr&lt;T&gt;::reset

```cpp
void reset() noexcept;  // (desde C++11)
```

  
Libera a referência para o objeto gerenciado. Após a chamada, *this não gerencia nenhum objeto. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <memory>
     
    int main()
    {
        auto shared = std::make_shared<int>(), shared2 = shared, shared3 = shared2;
     
        auto weak = std::weak_ptr<int>{shared};
     
        std::cout << std::boolalpha 
                  << "shared.use_count(): " << shared.use_count() << '\n'
                  << "weak.use_count(): " << weak.use_count() << '\n'
                  << "weak.expired(): " << weak.expired() << '\n';
     
        weak.reset();
     
        std::cout << "weak.reset();\n"
                  << "shared.use_count(): " << shared.use_count() << '\n'
                  << "weak.use_count(): " << weak.use_count() << '\n'
                  << "weak.expired(): " << weak.expired() << '\n';
    }
```

Saída: 
```
    shared.use_count(): 3
    weak.use_count(): 3
    weak.expired(): false
    weak.reset();
    shared.use_count(): 3
    weak.use_count(): 0
    weak.expired(): true
```

### Veja também

[ expired](<#/doc/memory/weak_ptr/expired>) |  verifica se o objeto referenciado já foi excluído   
(função membro pública)  