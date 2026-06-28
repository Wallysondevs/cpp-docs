# std::istreambuf_iterator&lt;CharT,Traits&gt;::equal

bool equal( const istreambuf_iterator& it ) const;

  
Verifica se *this e it são ambos válidos, ou ambos inválidos, independentemente dos objetos stream buffer que eles utilizam.

### Parâmetros

it  |  \-  |  outro iterator de stream buffer para comparar   
  
### Valor de retorno

`true` se *this e `it` são ambos válidos, ou ambos inválidos, `false` caso contrário.

### Exceções

Pode lançar exceções definidas pela implementação.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 110](<https://cplusplus.github.io/LWG/issue110>) | C++98  | a assinatura era `bool equal(istreambuf_iterator& it)` | `consts` adicionados   
[LWG 1126](<https://cplusplus.github.io/LWG/issue1126>) | C++98  | [o problema LWG 110](<https://cplusplus.github.io/LWG/issue110>) não foi resolvido corretamente, deixando o tipo do parâmetro como `istreambuf_iterator&` | `const` adicionado 