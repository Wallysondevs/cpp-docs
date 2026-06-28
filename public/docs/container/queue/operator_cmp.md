# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::queue)

```cpp
template< class T, class Container >
bool operator==( const std::queue<T, Container>& lhs,
const std::queue<T, Container>& rhs );  // (1)
template< class T, class Container >
bool operator!=( const std::queue<T, Container>& lhs,
const std::queue<T, Container>& rhs );  // (2)
template< class T, class Container >
bool operator< ( const std::queue<T, Container>& lhs,
const std::queue<T, Container>& rhs );  // (3)
template< class T, class Container >
bool operator<=( const std::queue<T, Container>& lhs,
const std::queue<T, Container>& rhs );  // (4)
template< class T, class Container >
bool operator> ( const std::queue<T, Container>& lhs,
const std::queue<T, Container>& rhs );  // (5)
template< class T, class Container >
bool operator>=( const std::queue<T, Container>& lhs,
const std::queue<T, Container>& rhs );  // (6)
template< class T, std::three_way_comparable Container >
std::compare_three_way_result_t<Container>
operator<=>( const std::queue<T, Container>& lhs,
const std::queue<T, Container>& rhs );  // (7) (desde C++20)
```

  
Compara o conteúdo dos containers subjacentes de dois adaptadores de container. A comparação é feita aplicando o operador correspondente aos containers subjacentes. 

### Parâmetros

lhs, rhs  |  \-  |  adaptadores de container cujo conteúdo será comparado   
-`T` deve satisfazer os requisitos de [EqualityComparable](<#/doc/named_req/EqualityComparable>).   
  
### Valor de retorno

1-6) true se a comparação correspondente resultar em true, false caso contrário.

7) Resultado da comparação de três vias nos containers subjacentes.

### Complexidade

Linear no tamanho do container. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 410](<https://cplusplus.github.io/LWG/issue410>) | C++98  | a semântica dos operadores `!=`, `>`, `<=` e `>=` estava ausente  | adicionado 