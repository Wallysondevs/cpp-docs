# std::experimental::static_pointer_cast, std::experimental::dynamic_pointer_cast, std::experimental::const_pointer_cast, std::experimental::reinterpret_pointer_cast

template< class T, class U >   
[std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt;  
static_pointer_cast( const [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;U&gt;& r ) noexcept; |  (1)  |  (library fundamentals TS)  
template< class T, class U >   
[std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt;  
dynamic_pointer_cast( const [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;U&gt;& r ) noexcept; |  (2)  |  (library fundamentals TS)  
template< class T, class U >   
[std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt;  
const_pointer_cast( const [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;U&gt;& r ) noexcept; |  (3)  |  (library fundamentals TS)  
template< class T, class U >   
[std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt;  
reinterpret_pointer_cast( const [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;U&gt;& r ) noexcept; |  (4)  |  (library fundamentals TS)  

  
Cria uma nova instância de `std::experimental::shared_ptr` cujo ponteiro armazenado é obtido a partir do ponteiro armazenado de `r` usando uma expressão de cast. Se `r` estiver vazio, o novo `shared_ptr` também estará (mas seu ponteiro armazenado não é necessariamente nulo).

Caso contrário, o novo `shared_ptr` compartilhará a propriedade com `r`, exceto que ele estará vazio se o `dynamic_cast` realizado por `dynamic_pointer_cast` retornar um ponteiro nulo.

Seja `Y` typename [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt;::element_type, então o ponteiro armazenado do `std::experimental::shared_ptr` resultante será obtido chamando (na ordem respectiva):

1) static_cast<Y*>(r.get()).

2) dynamic_cast<Y*>(r.get()) (se o resultado do `dynamic_cast` for um valor de ponteiro nulo, o `shared_ptr` retornado estará vazio).

3) const_cast<Y*>(r.get()).

4) reinterpret_cast<Y*>(r.get()).

O comportamento dessas funções é indefinido a menos que o cast correspondente de `U*` para `T*` seja bem formado:

1) O comportamento é indefinido a menos que static_cast<T*>((U*)nullptr) seja bem formado.

2) O comportamento é indefinido a menos que dynamic_cast<T*>((U*)nullptr) seja bem formado.

3) O comportamento é indefinido a menos que const_cast<T*>((U*)nullptr) seja bem formado.

4) O comportamento é indefinido a menos que reinterpret_cast<T*>((U*)nullptr) seja bem formado.

### Parâmetros

r  |  \-  |  o ponteiro a ser convertido   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (constructor)](<#/doc/experimental/shared_ptr/shared_ptr>) |  constrói um novo `shared_ptr`   
(função membro pública)  
[ static_pointer_castdynamic_pointer_castconst_pointer_castreinterpret_pointer_cast](<#/doc/memory/shared_ptr/pointer_cast>)(C++17) |  aplica [`static_cast`](<#/doc/language/static_cast>), [`dynamic_cast`](<#/doc/language/dynamic_cast>), [`const_cast`](<#/doc/language/const_cast>), ou [`reinterpret_cast`](<#/doc/language/reinterpret_cast>) ao ponteiro armazenado   
(modelo de função)