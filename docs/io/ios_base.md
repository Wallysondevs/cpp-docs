# std::ios_base

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
class ios_base;
```

A classe `ios_base` é uma classe multiuso que serve como classe base para todas as classes de stream de E/S. Ela mantém vários tipos de dados:

1) informações de estado: flags de status do stream.

2) informações de controle: flags que controlam a formatação de sequências de entrada e saída e o locale imbuído.

3) armazenamento privado: estrutura de dados extensível indexada que permite membros do tipo long e void*, que pode ser implementada como dois arrays de comprimento arbitrário ou um único array de structs de dois elementos ou outro container.

4) callbacks: número arbitrário de funções definidas pelo usuário a serem chamadas de [`imbue()`](<#/doc/io/ios_base/imbue>), [std::basic_ios::copyfmt()](<#/doc/io/basic_ios/copyfmt>), e [`~ios_base()`](<#/doc/io/ios_base/~ios_base>).

Uma implementação típica contém constantes membro correspondentes a todos os valores de [`fmtflags`](<#/doc/io/ios_base/fmtflags>), [`iostate`](<#/doc/io/ios_base/iostate>), [`openmode`](<#/doc/io/ios_base/openmode>), e [`seekdir`](<#/doc/io/ios_base/seekdir>) mostrados abaixo, variáveis membro para manter a precisão, largura e flags de formatação atuais, a máscara de exceção, o estado de erro do buffer, um container redimensionável contendo os callbacks, o locale atualmente imbuído, o armazenamento privado e uma variável inteira estática para [`xalloc()`](<#/doc/io/ios_base/xalloc>).

### Funções membro

[ (construtor)](<#/doc/io/ios_base/ios_base>) | constrói o objeto
(função membro protegida)
[ (destrutor)](<#/doc/io/ios_base/~ios_base>)[virtual] | destrói o objeto
(função membro pública virtual)
[ operator=](<#/>) | atribui ao stream
(função membro pública)

##### Formatação

[ flags](<#/doc/io/ios_base/flags>) | gerencia flags de formato
(função membro pública)
[ setf](<#/doc/io/ios_base/setf>) | define uma flag de formato específica
(função membro pública)
[ unsetf](<#/doc/io/ios_base/unsetf>) | limpa uma flag de formato específica
(função membro pública)
[ precision](<#/doc/io/ios_base/precision>) | gerencia a precisão decimal de operações de ponto flutuante
(função membro pública)
[ width](<#/doc/io/ios_base/width>) | gerencia a largura do campo
(função membro pública)

##### Locales

[ imbue](<#/doc/io/ios_base/imbue>) | define o locale
(função membro pública)
[ getloc](<#/doc/io/ios_base/getloc>) | retorna o locale atual
(função membro pública)

##### Array extensível interno

[ xalloc](<#/doc/io/ios_base/xalloc>)[static] | retorna um inteiro único em todo o programa que é seguro para usar como índice para [`pword()`](<#/doc/io/ios_base/pword>) e [`iword()`](<#/doc/io/ios_base/iword>)
(função membro estática pública)
[ iword](<#/doc/io/ios_base/iword>) | redimensiona o armazenamento privado se necessário e acessa o elemento long no índice fornecido
(função membro pública)
[ pword](<#/doc/io/ios_base/pword>) | redimensiona o armazenamento privado se necessário e acessa o elemento void* no índice fornecido
(função membro pública)

##### Diversos

[ register_callback](<#/doc/io/ios_base/register_callback>) | registra função de callback de evento
(função membro pública)
[ sync_with_stdio](<#/doc/io/ios_base/sync_with_stdio>)[static] | define se as bibliotecas de E/S C++ e C são interoperáveis
(função membro estática pública)

### Classes membro

[ failure](<#/doc/io/ios_base/failure>) | exceção de stream
(classe membro pública)
[ Init](<#/doc/io/ios_base/Init>) | inicializa objetos de stream padrão
(classe membro pública)

### Tipos e constantes membro

---
Tipo | Explicação
---|---
[ openmode](<#/doc/io/ios_base/openmode>) | tipo de modo de abertura de stream As seguintes constantes também são definidas: | Constante | Explicação
[`app`](<#/doc/io/ios_base/openmode>) | posiciona no final do stream antes de cada escrita
[`binary`](<#/doc/io/ios_base/openmode>) | abre em modo binário
[`in`](<#/doc/io/ios_base/openmode>) | abre para leitura
[`out`](<#/doc/io/ios_base/openmode>) | abre para escrita
[`trunc`](<#/doc/io/ios_base/openmode>) | descarta o conteúdo do stream ao abrir
[`ate`](<#/doc/io/ios_base/openmode>) | posiciona no final do stream imediatamente após abrir
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
[`boolalpha`](<#/doc/io/ios_base/fmtflags>) | insere e extrai tipo bool em formato alfanumérico: veja [std::boolalpha](<#/doc/io/manip/boolalpha>)
[`showbase`](<#/doc/io/ios_base/fmtflags>) | gera um prefixo indicando a base numérica para saída de inteiros, requer o indicador de moeda em E/S monetária: veja [std::showbase](<#/doc/io/manip/showbase>)
[`showpoint`](<#/doc/io/ios_base/fmtflags>) | gera um caractere de ponto decimal incondicionalmente para saída de números de ponto flutuante: veja [std::showpoint](<#/doc/io/manip/showpoint>)
[`showpos`](<#/doc/io/ios_base/fmtflags>) | gera um caractere + para saída numérica não negativa: veja [std::showpos](<#/doc/io/manip/showpos>)
[`skipws`](<#/doc/io/ios_base/fmtflags>) | ignora espaços em branco iniciais antes de certas operações de entrada: veja [std::skipws](<#/doc/io/manip/skipws>)
[`unitbuf`](<#/doc/io/ios_base/fmtflags>) | descarrega a saída após cada operação de saída: veja [std::unitbuf](<#/doc/io/manip/unitbuf>)
[`uppercase`](<#/doc/io/ios_base/fmtflags>) | substitui certas letras minúsculas por seus equivalentes maiúsculos em certas operações de saída: veja [std::uppercase](<#/doc/io/manip/uppercase>)

(typedef)
[ iostate](<#/doc/io/ios_base/iostate>) | tipo de estado do stream As seguintes constantes também são definidas: | Constante | Explicação
---|---
[`goodbit`](<#/doc/io/ios_base/iostate>) | sem erro
[`badbit`](<#/doc/io/ios_base/iostate>) | erro de stream irrecuperável
[`failbit`](<#/doc/io/ios_base/iostate>) | operação de entrada/saída falhou (erro de formatação ou extração)
[`eofbit`](<#/doc/io/ios_base/iostate>) | sequência de entrada associada atingiu o fim do arquivo

(typedef)
[ seekdir](<#/doc/io/ios_base/seekdir>) | tipo de direção de busca As seguintes constantes também são definidas: | Constante | Explicação
---|---
[`beg`](<#/doc/io/ios_base/seekdir>) | o início de um stream
[`end`](<#/doc/io/ios_base/seekdir>) | o final de um stream
[`cur`](<#/doc/io/ios_base/seekdir>) | a posição atual do indicador de posição do stream

(typedef)
[ event](<#/doc/io/ios_base/event>) | especifica o tipo de evento
(enum)
[ event_callback](<#/doc/io/ios_base/event_callback>) | tipo de função de callback
---|---
|

##### Tipos membro obsoletos

---
Tipo | Explicação
---|---
`io_state` (obsoleto) | tipo inteiro que pode ser usado como `iostate`
`open_mode` (obsoleto) | tipo inteiro que pode ser usado como `openmode`
`seek_dir` (obsoleto) | tipo inteiro que pode ser usado como `seekdir`
`streamoff` (obsoleto) | tipo não especificado que pode ser usado como `off_type`, não necessariamente [std::streamoff](<#/doc/io/streamoff>)
`streampos` (obsoleto) | tipo não especificado que pode ser usado como `pos_type`, não necessariamente [std::streampos](<#/doc/io/fpos>)
(até C++17)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 1357](<https://cplusplus.github.io/LWG/issue1357>)
([N3110](<https://wg21.link/N3110>)) | C++98 | `std::ios_base` definia operator~, operator&
---|---
e operator| para os tipos `openmode`, `fmtflags` e
`iostate`, violando os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>)[1](<#/doc/io/ios_base>) | removeu essas definições

1.  [↑](<#/doc/io/ios_base>) Um [BitmaskType](<#/doc/named_req/BitmaskType>) precisa suportar operações bit a bit por conta própria. O suporte a operações bit a bit não deve ser fornecido externamente.

### Veja também

[ basic_ios](<#/doc/io/basic_ios>) | gerencia um buffer de stream arbitrário
(modelo de classe)