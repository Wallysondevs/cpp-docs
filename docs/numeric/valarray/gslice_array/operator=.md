# std::gslice_array&lt;T&gt;::operator=

```cpp
void operator=( const T& value ) const;  // (1)
void operator=( const std::valarray<T>& val_arr ) const;  // (2)
const gslice_array& operator=( const gslice_array& other_arr ) const;  // (3)
```

  
Atribui valores a todos os elementos referenciados.

1) Atribui `value` a todos os elementos.

2) Atribui os elementos de `val_arr` aos elementos referenciados por `*this`.

3) Atribui os elementos selecionados de `other_arr` aos elementos referenciados por `*this`.

### Parâmetros

value  |  \-  |  um valor para atribuir a todos os elementos referenciados   
---|---|---
val_arr  |  \-  |  [std::valarray](<#/doc/numeric/valarray>) para atribuir   
other_arr  |  \-  |  [std::gslice_array](<#/doc/numeric/valarray/gslice_array>) para atribuir   
  
### Valor de retorno

1,2) (nenhum)

3) `*this`

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 123](<https://cplusplus.github.io/LWG/issue123>) | C++98  | a sobrecarga (2) era não-const  | tornou-se const   
[LWG 253](<https://cplusplus.github.io/LWG/issue253>) | C++98  | o operador de atribuição de cópia era privado  | tornou-se público   
[LWG 621](<https://cplusplus.github.io/LWG/issue621>) | C++98  | o operador de atribuição de cópia era não-const  | tornou-se const 