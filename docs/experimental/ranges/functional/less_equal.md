# std::experimental::ranges::less_equal

Definido no cabeçalho `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```c
template< class T = void >
requires StrictTotallyOrdered<T>
Same<T, void>
/* < on two const T lvalues invokes a built-in operator comparing pointers */
struct less_equal;
template<>
struct less_equal<void>;
```

  
Objeto de função para realizar comparações. O template primário invoca `operator<` em lvalues `const` do tipo `T` com a ordem dos argumentos invertida e então nega o resultado. A especialização `less_equal<void>` deduz os tipos de parâmetro do `function call operator` a partir dos argumentos (mas não o tipo de retorno).

Todas as especializações de `less_equal` são [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>).

### Tipos de membro

Tipo de membro  |  Definição   
---|---
`is_transparent` (membro apenas da especialização `less_equal<void>`) |  /* não especificado */   
  
### Funções membro

operator() |  verifica se o primeiro argumento é _menor_ ou _igual_ ao segundo   
(função membro pública)  
  
##  std::experimental::ranges::less_equal::operator()

constexpr bool operator()(const T& x, const T& y) const; |  (1)  |  (membro apenas do template primário `less_equal<T>`)  
template< class T, class U >  
requires StrictTotallyOrderedWith<T, U>
/* std::declval&lt;T&gt;() < std::declval&lt;U&gt;() resolves to  
a built-in operator comparing pointers */  
constexpr bool operator()(T&& t, U&& u) const; |  (2)  |  (membro apenas da especialização `less_equal<void>`)  

  
1) Compara `x` e `y`. Equivalente a `return ![ranges::less](<#/doc/experimental/ranges/functional/less>)<>{}(y, x);`.

2) Compara `t` e `u`. Equivalente a `return ![ranges::less](<#/doc/experimental/ranges/functional/less>)<>{}([std::forward](<#/doc/utility/forward>)<U>(u), [std::forward](<#/doc/utility/forward>)<T>(t));`.

### Notas

Ao contrário de [std::less_equal](<#/doc/utility/functional/less_equal>), `ranges::less_equal` requer que todos os seis operadores de comparação `<`, `<=`, `>`, `>=`, `==` e `!=` sejam válidos (através das `constraints` [`StrictTotallyOrdered`](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>) e [`StrictTotallyOrderedWith`](<#/doc/experimental/ranges/concepts/StrictTotallyOrdered>)) e é inteiramente definido em termos de `ranges::less`. No entanto, a implementação é livre para usar `operator<=` diretamente, porque esses `concepts` exigem que os resultados dos operadores de comparação sejam consistentes.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ less_equal](<#/doc/utility/functional/less_equal>) |  objeto de função que implementa x <= y   
(template de classe)  