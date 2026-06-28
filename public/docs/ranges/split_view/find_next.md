# std::ranges::split_view&lt;V,Pattern&gt;::find_next

constexpr [ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>  
/*find_next*/( [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt; it ); |  | (exposition only*)  

  
Procura pela próxima ocorrência de pattern na view subjacente. Equivalente a: 

auto [b, e] = [ranges::search](<#/doc/algorithm/ranges/search>)([ranges::subrange](<#/doc/ranges/subrange>)(it, [ranges::end](<#/doc/ranges/end>)(`_[base_](<#/doc/ranges/split_view>)_`)),` ` _[pattern_](<#/doc/ranges/split_view>)_`);  
  
if (b != [ranges::end](<#/doc/ranges/end>)(`_[base_](<#/doc/ranges/split_view>)_`) and [ranges::empty](<#/doc/ranges/empty>)(`_[pattern_](<#/doc/ranges/split_view>)_`))  
{  
++b;  
++e;  
}  
  
return {b, e};

### Parâmetros

it  |  \-  |  um iterator para a posição onde iniciar a busca   
  
### Valor de retorno

Um subrange que representa a próxima posição do pattern, se encontrado. Um subrange vazio caso contrário. 