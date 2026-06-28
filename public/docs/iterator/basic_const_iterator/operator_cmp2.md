# operator&lt;,&lt;=,&gt;,&gt;=(std::basic_const_iterator&lt;Iter&gt;)

```cpp
template< /*not-a-const-iterator*/ I >
friend constexpr bool operator<( const I& x, const basic_const_iterator& y )
requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;  // (1) (desde C++23)
template< /*not-a-const-iterator*/ I >
friend constexpr bool operator>( const I& x, const basic_const_iterator& y )
requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;  // (2) (desde C++23)
template< /*not-a-const-iterator*/ I >
friend constexpr bool operator<=( const I& x, const basic_const_iterator& y )
requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;  // (3) (desde C++23)
template< /*not-a-const-iterator*/ I >
friend constexpr bool operator>=( const I& x, const basic_const_iterator& y )
requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;  // (4) (desde C++23)
```

  
Compara um `basic_const_iterator` com outro valor. Esses templates de função são usados quando o operando esquerdo não é um `basic_const_iterator`.

`I` satisfaz o concept apenas para exposição /*not-a-const-iterator*/ se e somente se não for uma especialização de `basic_const_iterator`.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `basic_const_iterator<Iter>` é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

1) x < y.base()

2) x > y.base()

3) x <= y.base()

4) x >= y.base()

### Notas

Se o operando esquerdo for um `basic_const_iterator`, as [funções de comparação membro](<#/doc/iterator/basic_const_iterator/operator_cmp>) são usadas.

### Exemplo

Execute este código
```
    #include <iterator>
     
    int main()
    {
        static int arr[1];
        static constexpr std::basic_const_iterator<int*> it = std::end(arr);
        static_assert(arr < it);
    }
```

### Veja também

| | Esta seção está incompleta   