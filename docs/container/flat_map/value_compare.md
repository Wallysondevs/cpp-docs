# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::value_compare

```cpp
class value_compare;  // (desde C++23)
```

  
`std::flat_map::value_compare` é um objeto de função que compara objetos do tipo [`std::flat_map::const_reference`](<#/doc/container/flat_map>) (um par de referências para a chave/valor armazenado) comparando os primeiros componentes (isto é, as chaves) dos pares passados. 

### Objetos Membro

Nome do Membro  |  Definição   
---|---
`_comp_` (private) |  o objeto de função de comparação do tipo [`std::flat_map::key_compare`](<#/doc/container/flat_map>)  
(objeto membro apenas para exposição*)  
  
### Funções Membro

(constructor)(private) |  constrói o objeto `value_compare`   
(public member function)  
operator() |  compara dois valores do tipo `value_type`   
(public member function)  
  
##  std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::value_compare::value_compare

```cpp
private:
value_compare( key_compare c );  // (apenas para exposição*)
```

  
Inicializa a instância subjacente do comparador `comp` com c. 

###  Parâmetros

c  |  \-  |  um comparador para atribuir   
  
##  std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::value_compare::operator()

bool operator()( const const_reference& lhs, const const_reference& rhs ) const;

  
Compara lhs.first e rhs.first chamando o comparador `comp` armazenado. 

###  Parâmetros

lhs, rhs  |  \-  |  valores a comparar   
  
###  Valor de retorno

comp(lhs.first, rhs.first)

### Exceções

Pode lançar exceções definidas pela implementação.