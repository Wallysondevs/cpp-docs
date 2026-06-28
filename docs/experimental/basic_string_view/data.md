# std::experimental::basic_string_view&lt;CharT,Traits&gt;::data

constexpr const_pointer data() const noexcept; |  |  (TS de fundamentos da biblioteca)  

  
Retorna um ponteiro para o array de caracteres subjacente. O ponteiro é tal que o range [data(), data() + size()) é válido e os valores nele correspondem aos valores da view. (n.b. Ao contrário de `basic_string::data()` e literais de string, `data()` pode retornar um ponteiro para um buffer que não é terminado em nulo. Portanto, é tipicamente um erro passar `data()` para uma rotina que aceita apenas um `const CharT*` e espera uma string terminada em nulo.) 

### Parâmetros

(nenhum) 

### Valor de retorno

Um ponteiro para o array de caracteres subjacente. 

### Complexidade

Constante. 

### Veja também

[ front](<#/doc/experimental/basic_string_view/front>) | acessa o primeiro caractere   
(função membro pública)  
[ back](<#/doc/experimental/basic_string_view/back>) | acessa o último caractere   
(função membro pública)