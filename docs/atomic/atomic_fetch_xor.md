# std::atomic_fetch_xor, std::atomic_fetch_xor_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
T atomic_fetch_xor( std::atomic<T>* obj,
typename std::atomic<T>::value_type arg ) noexcept;
template< class T >
T atomic_fetch_xor( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type arg ) noexcept;
template< class T >
T atomic_fetch_xor_explicit( std::atomic<T>* obj,
typename std::atomic<T>::value_type arg,
std::memory_order order) noexcept;
template< class T >
T atomic_fetch_xor_explicit( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type arg,
std::memory_order order) noexcept;
```

  
Substitui atomicamente o valor apontado por obj pelo resultado do XOR bit a bit entre o valor antigo de obj e arg. Retorna o valor que obj continha anteriormente.

A operação é realizada como se o seguinte fosse executado:

1,2) obj->fetch_xor(arg)

3,4) obj->fetch_xor(arg, order)

Se `std::atomic<T>` não possui um membro `fetch_xor` (este membro é fornecido apenas para [tipos integrais](<#/doc/atomic/atomic>), exceto bool), o programa é malformado.

### Parâmetros

obj  |  \-  |  ponteiro para o objeto atômico a ser modificado   
---|---|---
arg  |  \-  |  o valor para realizar XOR bit a bit com o valor armazenado no objeto atômico   
order  |  \-  |  a ordem de sincronização de memória   
  
### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de *obj.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[P0558R1](<https://wg21.link/P0558R1>) | C++11  | correspondência exata de tipo era exigida porque  
`T` era deduzido de múltiplos argumentos  | `T` é deduzido apenas  
de obj  
  
### Veja também

[ fetch_xor](<#/doc/atomic/atomic/fetch_xor>) |  realiza atomicamente um XOR bit a bit entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente   
(função membro pública de `std::atomic<T>`)  
[ atomic_fetch_oratomic_fetch_or_explicit](<#/doc/atomic/atomic_fetch_or>)(desde C++11)(desde C++11) |  substitui o objeto atômico pelo resultado do OR bit a bit com um argumento não atômico e obtém o valor anterior do atômico   
(modelo de função)  
[ atomic_fetch_andatomic_fetch_and_explicit](<#/doc/atomic/atomic_fetch_and>)(desde C++11)(desde C++11) |  substitui o objeto atômico pelo resultado do AND bit a bit com um argumento não atômico e obtém o valor anterior do atômico   
(modelo de função)  
[documentação C](<#/>) para atomic_fetch_xor, atomic_fetch_xor_explicit