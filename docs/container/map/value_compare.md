# std::map&lt;Key,T,Compare,Allocator&gt;::value_compare

class value_compare;

`std::map::value_compare` é um objeto de função que compara objetos do tipo `std::map::value_type` (pares chave-valor) comparando os primeiros componentes dos pares.

### Tipos de membros

Tipo | Definição
---|---
`result_type` (obsoleto em C++17)(removido em C++20) | bool
`first_argument_type` (obsoleto em C++17)(removido em C++20) | `value_type`
`second_argument_type` (obsoleto em C++17)(removido em C++20) | `value_type`
Esses tipos de membros são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<value_type, value_type, bool>. | (até C++11)

### Objetos membros protegidos

Compare comp | o comparador armazenado
(objeto membro protegido)

### Funções membro

**(construtor)** | constrói um novo objeto `value_compare`
(função membro protegida)
** operator()** | compara dois valores do tipo `value_type`
(função membro pública)

## std::map<Key,T,Compare,Alloc>::value_compare::value_compare

protected:
value_compare( Compare c );

Inicializa a instância interna do comparador com c.

### Parâmetros

- **c** — comparador a ser atribuído

## std::map<Key,T,Compare,Alloc>::value_compare::operator()

bool operator()( const value_type& lhs, const value_type& rhs ) const;

Compara lhs.first e rhs.first chamando o comparador armazenado.

### Parâmetros

- **lhs, rhs** — valores a comparar

### Valor de retorno

comp(lhs.first, rhs.first)

### Exceções

Pode lançar exceções definidas pela implementação.