# std::future&lt;T&gt;::valid

```cpp
bool valid() const noexcept;  // (desde C++11)
```

  
Verifica se o future se refere a um estado compartilhado.

Este é o caso apenas para futures que não foram construídos por padrão ou movidos (ou seja, retornados por [std::promise::get_future()](<#/doc/thread/promise/get_future>), [std::packaged_task::get_future()](<#/doc/thread/packaged_task/get_future>) ou [std::async()](<#/doc/thread/async>)) até a primeira vez que [get()](<#/doc/thread/future/get>) ou [share()](<#/doc/thread/future/share>) é chamado.

O comportamento é indefinido se qualquer função membro diferente do destrutor, do operador de atribuição de movimento (move-assignment operator), ou `valid` for chamada em um `future` que não se refere a um estado compartilhado (embora as implementações sejam encorajadas a lançar [std::future_error](<#/doc/thread/future_error>) indicando `no_state` neste caso). É válido mover de um objeto future para o qual `valid()` é falso.

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
        std::future<void> f = p.get_future();
    
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
    false
```

### Veja também

[ wait](<#/doc/thread/future/wait>) |  aguarda o resultado ficar disponível   
(função membro pública)  