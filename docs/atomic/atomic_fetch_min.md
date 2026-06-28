# std::atomic_fetch_min, std::atomic_fetch_min_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
T atomic_fetch_min( std::atomic<T>* obj,
typename std::atomic<T>::value_type arg ) noexcept;
template< class T >
T atomic_fetch_min( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type arg ) noexcept;
template< class T >
T atomic_fetch_min_explicit( std::atomic<T>* obj,
typename std::atomic<T>::value_type arg,
std::memory_order order ) noexcept;
template< class T >
T atomic_fetch_min_explicit( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type arg,
std::memory_order order ) noexcept;
```

  
Substitui atomicamente o valor apontado por obj pelo resultado de [std::min](<#/doc/algorithm/min>) entre o valor antigo de obj e arg. Retorna o valor que obj continha anteriormente. A operação é realizada como se o seguinte fosse executado: 

1,2) obj->fetch_min(arg)

3,4) obj->fetch_min(arg, order)

Se `std::atomic<T>` não possui um membro `fetch_min` (este membro é fornecido apenas para tipos [integrais](<#/doc/atomic/atomic>) e de [ponteiro](<#/doc/atomic/atomic>), exceto bool), o programa é malformado. 

### Parâmetros

obj  |  \-  |  ponteiro para o objeto atômico a ser modificado   
---|---|---
arg  |  \-  |  o valor para [std::min](<#/doc/algorithm/min>) com o valor armazenado no objeto atômico   
order  |  \-  |  a ordenação de sincronização de memória   
  
### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de *obj. 

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_atomic_min_max`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | Mínimo/máximo atômico   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ fetch_min](<#/doc/atomic/atomic/fetch_min>)(C++26) |  realiza atomicamente [std::min](<#/doc/algorithm/min>) entre o argumento e o valor do objeto atômico e obtém o valor que continha anteriormente   
(função membro pública de `std::atomic<T>`)  
[ atomic_fetch_maxatomic_fetch_max_explicit](<#/doc/atomic/atomic_fetch_max>)(C++26)(C++26) |  substitui o objeto atômico pelo resultado de [std::max](<#/doc/algorithm/max>) com um argumento não atômico e obtém o valor anterior do atômico   
(modelo de função)