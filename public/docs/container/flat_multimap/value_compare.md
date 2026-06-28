# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::value_compare

```cpp
class value_compare;  // (desde C++23)
```

  
`std::flat_multimap::value_compare` é um objeto de função que compara objetos do tipo [`std::flat_multimap::const_reference`](<#/doc/container/flat_multimap>) (um par de referências para a chave/valor armazenado) comparando os primeiros componentes (isto é, chaves) dos pares passados. 

### Membros de objeto

Nome do membro  |  Definição   
---|---
`_comp_` (private) |  o objeto de função de comparação do tipo [`std::flat_multimap::key_compare`](<#/doc/container/flat_multimap>)  
(objeto membro apenas para exposição*)  
  
### Funções membro

(construtor)(privado) |  constrói o objeto `value_compare`   
(função membro pública)  
operator() |  compara dois valores do tipo `value_type`   
(função membro pública)  
  
##  std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::value_compare::value_compare

```cpp
private:
value_compare( key_compare c );  // (apenas para exposição*)
```

  
Inicializa a instância subjacente do comparador `comp` com c. 

###  Parâmetros

c  |  \-  |  um comparador para atribuir   
  
##  std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::value_compare::operator()

bool operator()( const const_reference& lhs, const const_reference& rhs ) const;

  
Compara lhs.first e rhs.first chamando o comparador armazenado `comp`. 

###  Parâmetros

lhs, rhs  |  \-  |  valores para comparar   
  
###  Valor de retorno

comp(lhs.first, rhs.first)

### Exceções

Pode lançar exceções definidas pela implementação.