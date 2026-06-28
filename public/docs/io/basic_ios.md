# std::basic_ios

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>
> class basic_ios
: public std::ios_base
```

A classe `std::basic_ios` fornece facilidades para interfacear com objetos que possuem a interface [std::basic_streambuf](<#/doc/io/basic_streambuf>). Vários objetos `std::basic_ios` podem se referir a um único objeto `std::basic_streambuf` real.

Diagrama de herança

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`
---
Tipo | Definição
---|---
`std::ios` | std::basic_ios&lt;char&gt;
`std::wios` | std::basic_ios<wchar_t>

### Tipos de membros

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`

### Funções membro públicas

[ (construtor)](<#/doc/io/basic_ios/basic_ios>) | constrói o objeto
(função membro pública)
[ (destrutor)](<#/doc/io/basic_ios/~basic_ios>)[virtual] | destrói o objeto
(função membro pública virtual)
operator= | o operador de atribuição de cópia é deletado
(função membro pública)

##### Funções de Estado

[ good](<#/doc/io/basic_ios/good>) | verifica se nenhum erro ocorreu, ou seja, operações de E/S estão disponíveis
(função membro pública)
[ eof](<#/doc/io/basic_ios/eof>) | verifica se o fim do arquivo foi atingido
(função membro pública)
[ fail](<#/doc/io/basic_ios/fail>) | verifica se um erro ocorreu
(função membro pública)
[ bad](<#/doc/io/basic_ios/bad>) | verifica se um erro não recuperável ocorreu
(função membro pública)
[ operator!](<#/>) | verifica se um erro ocorreu (sinônimo de [fail()](<#/doc/io/basic_ios/fail>))
(função membro pública)
[ operator bool](<#/doc/io/basic_ios/operator_bool>) | verifica se nenhum erro ocorreu (sinônimo de `!`[fail()](<#/doc/io/basic_ios/fail>))
(função membro pública)
[ rdstate](<#/doc/io/basic_ios/rdstate>) | retorna os flags de estado
(função membro pública)
[ setstate](<#/doc/io/basic_ios/setstate>) | define os flags de estado
(função membro pública)
[ clear](<#/doc/io/basic_ios/clear>) | modifica os flags de estado
(função membro pública)

##### Formatação

[ copyfmt](<#/doc/io/basic_ios/copyfmt>) | copia informações de formatação
(função membro pública)
[ fill](<#/doc/io/basic_ios/fill>) | gerencia o caractere de preenchimento
(função membro pública)

##### Diversos

[ exceptions](<#/doc/io/basic_ios/exceptions>) | gerencia a máscara de exceção
(função membro pública)
[ imbue](<#/doc/io/basic_ios/imbue>) | define o locale
(função membro pública)
[ rdbuf](<#/doc/io/basic_ios/rdbuf>) | gerencia o stream buffer associado
(função membro pública)
[ tie](<#/doc/io/basic_ios/tie>) | gerencia o stream vinculado
(função membro pública)
[ narrow](<#/doc/io/basic_ios/narrow>) | estreita caracteres
(função membro pública)
[ widen](<#/doc/io/basic_ios/widen>) | alarga caracteres
(função membro pública)

### Funções membro protegidas

[ init](<#/doc/io/basic_ios/init>) | inicializa um **std::basic_ios** construído por padrão
(função membro protegida)
[ move](<#/doc/io/basic_ios/move>)(desde C++11) | move de outro **std::basic_ios**, exceto por `rdbuf`
(função membro protegida)
[ swap](<#/doc/io/basic_ios/swap>)(desde C++11) | troca com outro **std::basic_ios**, exceto por `rdbuf`
(função membro protegida)
[ set_rdbuf](<#/doc/io/basic_ios/set_rdbuf>) | substitui o `rdbuf` sem limpar seu estado de erro
(função membro protegida)

## Herdado de [std::ios_base](<#/doc/io/ios_base>)

### Funções membro

##### Formatação

---
[ flags](<#/doc/io/ios_base/flags>) | gerencia os flags de formato
(função membro pública de `std::ios_base`)
[ setf](<#/doc/io/ios_base/setf>) | define um flag de formato específico
(função membro pública de `std::ios_base`)
[ unsetf](<#/doc/io/ios_base/unsetf>) | limpa um flag de formato específico
(função membro pública de `std::ios_base`)
[ precision](<#/doc/io/ios_base/precision>) | gerencia a precisão decimal de operações de ponto flutuante
(função membro pública de `std::ios_base`)
[ width](<#/doc/io/ios_base/width>) | gerencia a largura do campo
(função membro pública de `std::ios_base`)

##### Locales

[ imbue](<#/doc/io/ios_base/imbue>) | define o locale
(função membro pública de `std::ios_base`)
[ getloc](<#/doc/io/ios_base/getloc>) | retorna o locale atual
(função membro pública de `std::ios_base`)

##### Array extensível interno

[ xalloc](<#/doc/io/ios_base/xalloc>)[static] | retorna um inteiro único em todo o programa que é seguro para usar como índice para [`pword()`](<#/doc/io/ios_base/pword>) e [`iword()`](<#/doc/io/ios_base/iword>)
(função membro estática pública de `std::ios_base`)
[ iword](<#/doc/io/ios_base/iword>) | redimensiona o armazenamento privado se necessário e acessa o elemento long no índice fornecido
(função membro pública de `std::ios_base`)
[ pword](<#/doc/io/ios_base/pword>) | redimensiona o armazenamento privado se necessário e acessa o elemento `void*` no índice fornecido
(função membro pública de `std::ios_base`)

##### Diversos

[ register_callback](<#/doc/io/ios_base/register_callback>) | registra a função de callback de evento
(função membro pública de `std::ios_base`)
[ sync_with_stdio](<#/doc/io/ios_base/sync_with_stdio>)[static] | define se as bibliotecas de E/S C++ e C são interoperáveis
(função membro estática pública de `std::ios_base`)

##### Classes membro

[ failure](<#/doc/io/ios_base/failure>) | exceção de stream
(classe membro pública de `std::ios_base`)
[ Init](<#/doc/io/ios_base/Init>) | inicializa objetos de stream padrão
(classe membro pública de `std::ios_base`)

### Tipos de membros e constantes

---
Tipo | Explicação
---|---
[ openmode](<#/doc/io/ios_base/openmode>) | tipo de modo de abertura de stream As seguintes constantes também são definidas: | Constante | Explicação
[`app`](<#/doc/io/ios_base/openmode>) | busca o fim do stream antes de cada escrita
[`binary`](<#/doc/io/ios_base/openmode>) | abre em [modo binário](<#/doc/io/c/FILE>)
[`in`](<#/doc/io/ios_base/openmode>) | abre para leitura
[`out`](<#/doc/io/ios_base/openmode>) | abre para escrita
[`trunc`](<#/doc/io/ios_base/openmode>) | descarta o conteúdo do stream ao abrir
[`ate`](<#/doc/io/ios_base/openmode>) | busca o fim do stream imediatamente após a abertura
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) | abre em modo exclusivo

(typedef)
[ fmtflags](<#/doc/io/ios_base/fmtflags>) | tipo de flags de formatação As seguintes constantes também são definidas: | Constante | Explicação
---|---
[`dec`](<#/doc/io/ios_base/fmtflags>) | usa base decimal para E/S de inteiros: veja [std::dec](<#/doc/io/manip/hex>)
[`oct`](<#/doc/io/ios_base/fmtflags>) | usa base octal para E/S de inteiros: veja [std::oct](<#/doc/io/manip/hex>)
[`hex`](<#/doc/io/ios_base/fmtflags>) | usa base hexadecimal para E/S de inteiros: veja [std::hex](<#/doc/io/manip/hex>)
[`basefield`](<#/doc/io/ios_base/fmtflags>) | dec | oct | hex. Útil para operações de mascaramento
[`left`](<#/doc/io/ios_base/fmtflags>) | ajuste à esquerda (adiciona caracteres de preenchimento à direita): veja [std::left](<#/doc/io/manip/left>)
[`right`](<#/doc/io/ios_base/fmtflags>) | ajuste à direita (adiciona caracteres de preenchimento à esquerda): veja [std::right](<#/doc/io/manip/left>)
[`internal`](<#/doc/io/ios_base/fmtflags>) | ajuste interno (adiciona caracteres de preenchimento ao ponto designado interno): veja [std::internal](<#/doc/io/manip/left>)
[`adjustfield`](<#/doc/io/ios_base/fmtflags>) | left | right | internal. Útil para operações de mascaramento
[`scientific`](<#/doc/io/ios_base/fmtflags>) | gera tipos de ponto flutuante usando notação científica, ou notação hexadecimal se combinado com fixed: veja [std::scientific](<#/doc/io/manip/fixed>)
[`fixed`](<#/doc/io/ios_base/fmtflags>) | gera tipos de ponto flutuante usando notação fixa, ou notação hexadecimal se combinado com scientific: veja [std::fixed](<#/doc/io/manip/fixed>)
[`floatfield`](<#/doc/io/ios_base/fmtflags>) | scientific | fixed. Útil para operações de mascaramento
[`boolalpha`](<#/doc/io/ios_base/fmtflags>) | insere e extrai o tipo bool em formato alfanumérico: veja [std::boolalpha](<#/doc/io/manip/boolalpha>)
[`showbase`](<#/doc/io/ios_base/fmtflags>) | gera um prefixo indicando a base numérica para saída de inteiros, requer o indicador de moeda em E/S monetária: veja [std::showbase](<#/doc/io/manip/showbase>)
[`showpoint`](<#/doc/io/ios_base/fmtflags>) | gera um caractere de ponto decimal incondicionalmente para saída de números de ponto flutuante: veja [std::showpoint](<#/doc/io/manip/showpoint>)
[`showpos`](<#/doc/io/ios_base/fmtflags>) | gera um caractere `+` para saída numérica não negativa: veja [std::showpos](<#/doc/io/manip/showpos>)
[`skipws`](<#/doc/io/ios_base/fmtflags>) | pula espaços em branco iniciais antes de certas operações de entrada: veja [std::skipws](<#/doc/io/manip/skipws>)
[`unitbuf`](<#/doc/io/ios_base/fmtflags>) | descarrega a saída após cada operação de saída: veja [std::unitbuf](<#/doc/io/manip/unitbuf>)
[`uppercase`](<#/doc/io/ios_base/fmtflags>) | substitui certas letras minúsculas por seus equivalentes maiúsculos em certas operações de saída: veja [std::uppercase](<#/doc/io/manip/uppercase>)

(typedef)
[ iostate](<#/doc/io/ios_base/iostate>) | tipo de estado do stream As seguintes constantes também são definidas: | Constante | Explicação
---|---
[`goodbit`](<#/doc/io/ios_base/iostate>) | nenhum erro
[`badbit`](<#/doc/io/ios_base/iostate>) | erro de stream irrecuperável
[`failbit`](<#/doc/io/ios_base/iostate>) | operação de entrada/saída falhou (erro de formatação ou extração)
[`eofbit`](<#/doc/io/ios_base/iostate>) | sequência de entrada associada atingiu o fim do arquivo

(typedef)
[ seekdir](<#/doc/io/ios_base/seekdir>) | tipo de direção de busca As seguintes constantes também são definidas: | Constante | Explicação
---|---
[`beg`](<#/doc/io/ios_base/seekdir>) | o início de um stream
[`end`](<#/doc/io/ios_base/seekdir>) | o fim de um stream
[`cur`](<#/doc/io/ios_base/seekdir>) | a posição atual do indicador de posição do stream

(typedef)
[ event](<#/doc/io/ios_base/event>) | especifica o tipo de evento
(enum)
[ event_callback](<#/doc/io/ios_base/event_callback>) | tipo de função de callback
(typedef)

### Notas

Uma implementação direta de `std::basic_ios` armazena apenas os seguintes membros (que dependem todos dos parâmetros de template e, portanto, não podem fazer parte de [std::ios_base](<#/doc/io/ios_base>)):

* o caractere de preenchimento (veja [`fill()`](<#/doc/io/basic_ios/fill>))
* o ponteiro do stream vinculado (veja [`tie()`](<#/doc/io/basic_ios/tie>))
* o ponteiro do stream buffer associado (veja [`rdbuf()`](<#/doc/io/basic_ios/rdbuf>)).

Implementações reais variam:

Microsoft Visual Studio armazena apenas esses três membros.

LLVM libc++ armazena 1 membro a menos: ele mantém o ponteiro `rdbuf` como um membro `void*` de `ios_base`.

GNU libstdc++ armazena 4 membros adicionais: três facets em cache e um flag para indicar que o preenchimento foi inicializado.