# std::shared_future&lt;T&gt;::valid

```cpp
bool valid() const noexcept;  // (desde C++11)
```

  
Verifica se o future se refere a um estado compartilhado.

Este é o caso apenas para futures que não foram construídos por padrão ou movidos. Ao contrário de [std::future](<#/doc/thread/future>), o estado compartilhado de `std::shared_future` não é invalidado quando `get()` é chamado.

O comportamento é indefinido se qualquer função membro, exceto o destrutor, o operador de atribuição de cópia, o operador de atribuição de movimento ou `valid`, for chamada em um `shared_future` que não se refere a um estado compartilhado (embora as implementações sejam encorajadas a lançar [std::future_error](<#/doc/thread/future_error>) indicando `no_state` neste caso). É válido mover ou copiar de um objeto shared_future para o qual `valid()` é falso.

### Parâmetros

(nenhum)

### Valor de retorno

true se *this se refere a um estado compartilhado, caso contrário false.

### Exemplo

Execute este código
```cpp
    #include <future>
    #include <iostream>
    
    int main()
    {
        std::promise<void> p;
        std::shared_future<void> f = p.get_future();
    
        std::cout << std::boolalpha;
    
        std::cout << f.valid() << '\n';
        p.set_value();
        std::cout << f.valid() << '\n';
        f.get();
        std::cout << f.valid() << '\n';
    }
```

Saída:
```
    true
    true
    true
```

### Veja também

[ wait](<#/doc/thread/shared_future/wait>) | aguarda o resultado ficar disponível   
(função membro pública)  