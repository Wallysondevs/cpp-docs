# std::experimental::atomic_weak_ptr

Definido no header `[<experimental/atomic>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/atomic&action=edit&redlink=1> "cpp/header/experimental/atomic \(page does not exist\)")`

```cpp
template< class T >
class atomic_weak_ptr;
```

  
O template de classe `atomic_weak_ptr` fornece operações de ponteiro atômicas thread-safe sobre um [std::weak_ptr](<#/doc/memory/weak_ptr>). 

### Funções membro

[ (constructor)](<#/doc/experimental/atomic_weak_ptr/atomic_weak_ptr>) |  constrói um objeto `atomic_weak_ptr`   
(public member function)  
[ operator=](<#/>) |  armazena um valor em um objeto `atomic_weak_ptr`   
(public member function)  
[ is_lock_free](<#/doc/experimental/atomic_weak_ptr/is_lock_free>) |  verifica se o objeto `atomic_weak_ptr` é lock-free   
(public member function)  
[ store](<#/doc/experimental/atomic_weak_ptr/store>) |  substitui atomicamente o valor do objeto atômico por um argumento não atômico   
(public member function)  
[ load](<#/doc/experimental/atomic_weak_ptr/load>) |  obtém atomicamente o valor do objeto atômico   
(public member function)  
[ operator weak_ptr&lt;T&gt;](<#/doc/experimental/atomic_weak_ptr/operator_weak_ptr>) |  carrega um valor de um objeto atômico   
(public member function)  
[ exchange](<#/doc/experimental/atomic_weak_ptr/exchange>) |  substitui atomicamente o valor do objeto atômico e obtém o valor mantido anteriormente   
(public member function)  
[ compare_exchange_weakcompare_exchange_strong](<#/doc/experimental/atomic_weak_ptr/compare_exchange>) |  compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se iguais ou uma carga atômica se não   
(public member function)