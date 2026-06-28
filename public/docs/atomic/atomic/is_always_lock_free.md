# std::atomic&lt;T&gt;::is_always_lock_free

```cpp
static constexpr bool is_always_lock_free = /*implementation-defined*/;  // (desde C++17)
```

  
É igual a true se este tipo atômico for sempre lock-free e false se nunca ou às vezes for lock-free. 

O valor desta constante é consistente tanto com a macro `ATOMIC_xxx_LOCK_FREE`, onde definida, quanto com a função membro is_lock_free e a função não-membro [std::atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>). 

### Notes

Não existe uma função não-membro equivalente a esta constante membro estática porque funções não-membro recebem ponteiros para tipos atômicos, e, portanto, não são tão úteis em [expressões constantes](<#/doc/language/constant_expression>). 

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_atomic_is_always_lock_free`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | `constexpr atomic<T>::is_always_lock_free`  
  
### Veja também

[ is_lock_free](<#/doc/atomic/atomic/is_lock_free>) |  verifica se o objeto atômico é lock-free   
(função membro pública)  
[ atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>)(C++11) |  verifica se as operações do tipo atômico são lock-free   
(modelo de função)