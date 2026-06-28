# std::experimental::shared_ptr&lt;T&gt;::operator[]

element_type& operator[]( [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) i ) const noexcept; |  |  (library fundamentals TS)  

  
Indexa o array apontado pelo ponteiro armazenado.

O comportamento é indefinido se o ponteiro armazenado for nulo ou se `i` for negativo.

Se `T` (o parâmetro template de `shared_ptr`) for um tipo array `U[N]`, `i` deve ser menor que `N`, caso contrário o comportamento é indefinido.

### Parâmetros

i  |  \-  |  o índice do array   
  
### Valor de retorno

Uma referência para o i-ésimo elemento do array, ou seja, get()[i].

### Observações

Quando `T` não é um tipo array, é não especificado se esta função é declarada. Se a função for declarada, é não especificado qual é o seu tipo de retorno, exceto que a declaração (embora não necessariamente a definição) da função é garantida como sendo legal.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ get](<#/doc/experimental/shared_ptr/get>) |  retorna o ponteiro armazenado   
(função membro pública)  