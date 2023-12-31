PGDMP         2                {            hackaton    15.0    15.0 2    2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            5           1262    20135    hackaton    DATABASE     �   CREATE DATABASE hackaton WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE hackaton;
                postgres    false            �            1259    20194    QuizAnswers    TABLE     �   CREATE TABLE public."QuizAnswers" (
    id integer NOT NULL,
    "userId" integer,
    "quizId" integer,
    answer integer,
    "questionId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."QuizAnswers";
       public         heap    postgres    false            �            1259    20193    QuizAnswers_id_seq    SEQUENCE     �   CREATE SEQUENCE public."QuizAnswers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."QuizAnswers_id_seq";
       public          postgres    false    222            6           0    0    QuizAnswers_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."QuizAnswers_id_seq" OWNED BY public."QuizAnswers".id;
          public          postgres    false    221            �            1259    20180    QuizQuestions    TABLE     �  CREATE TABLE public."QuizQuestions" (
    id integer NOT NULL,
    "quizId" integer,
    question character varying(255),
    correct_answer character varying(255),
    choice_1 character varying(255),
    choice_2 character varying(255),
    choice_3 character varying(255),
    choice_4 character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."QuizQuestions";
       public         heap    postgres    false            �            1259    20179    QuizQuestions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."QuizQuestions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."QuizQuestions_id_seq";
       public          postgres    false    220            7           0    0    QuizQuestions_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."QuizQuestions_id_seq" OWNED BY public."QuizQuestions".id;
          public          postgres    false    219            �            1259    20216    QuizResults    TABLE     �   CREATE TABLE public."QuizResults" (
    id integer NOT NULL,
    "userId" integer,
    "quizId" integer,
    score integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."QuizResults";
       public         heap    postgres    false            �            1259    20215    QuizResults_id_seq    SEQUENCE     �   CREATE SEQUENCE public."QuizResults_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."QuizResults_id_seq";
       public          postgres    false    224            8           0    0    QuizResults_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."QuizResults_id_seq" OWNED BY public."QuizResults".id;
          public          postgres    false    223            �            1259    20166    Quizzes    TABLE       CREATE TABLE public."Quizzes" (
    id integer NOT NULL,
    name character varying(255),
    description text,
    duration integer,
    "creatorId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Quizzes";
       public         heap    postgres    false            �            1259    20165    Quizzes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Quizzes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Quizzes_id_seq";
       public          postgres    false    218            9           0    0    Quizzes_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Quizzes_id_seq" OWNED BY public."Quizzes".id;
          public          postgres    false    217            �            1259    20136    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    20142    Users    TABLE       CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    role integer
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    20141    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    216            :           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    215            �           2604    20197    QuizAnswers id    DEFAULT     t   ALTER TABLE ONLY public."QuizAnswers" ALTER COLUMN id SET DEFAULT nextval('public."QuizAnswers_id_seq"'::regclass);
 ?   ALTER TABLE public."QuizAnswers" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222                       2604    20183    QuizQuestions id    DEFAULT     x   ALTER TABLE ONLY public."QuizQuestions" ALTER COLUMN id SET DEFAULT nextval('public."QuizQuestions_id_seq"'::regclass);
 A   ALTER TABLE public."QuizQuestions" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    20219    QuizResults id    DEFAULT     t   ALTER TABLE ONLY public."QuizResults" ALTER COLUMN id SET DEFAULT nextval('public."QuizResults_id_seq"'::regclass);
 ?   ALTER TABLE public."QuizResults" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            ~           2604    20169 
   Quizzes id    DEFAULT     l   ALTER TABLE ONLY public."Quizzes" ALTER COLUMN id SET DEFAULT nextval('public."Quizzes_id_seq"'::regclass);
 ;   ALTER TABLE public."Quizzes" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            }           2604    20145    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            -          0    20194    QuizAnswers 
   TABLE DATA           o   COPY public."QuizAnswers" (id, "userId", "quizId", answer, "questionId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   U=       +          0    20180    QuizQuestions 
   TABLE DATA           �   COPY public."QuizQuestions" (id, "quizId", question, correct_answer, choice_1, choice_2, choice_3, choice_4, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   r=       /          0    20216    QuizResults 
   TABLE DATA           `   COPY public."QuizResults" (id, "userId", "quizId", score, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   �>       )          0    20166    Quizzes 
   TABLE DATA           k   COPY public."Quizzes" (id, name, description, duration, "creatorId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   �>       %          0    20136    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    214   )?       '          0    20142    Users 
   TABLE DATA           \   COPY public."Users" (id, name, email, password, "createdAt", "updatedAt", role) FROM stdin;
    public          postgres    false    216   �?       ;           0    0    QuizAnswers_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."QuizAnswers_id_seq"', 1, false);
          public          postgres    false    221            <           0    0    QuizQuestions_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."QuizQuestions_id_seq"', 14, true);
          public          postgres    false    219            =           0    0    QuizResults_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."QuizResults_id_seq"', 12, true);
          public          postgres    false    223            >           0    0    Quizzes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Quizzes_id_seq"', 8, true);
          public          postgres    false    217            ?           0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 22, true);
          public          postgres    false    215            �           2606    20199    QuizAnswers QuizAnswers_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."QuizAnswers"
    ADD CONSTRAINT "QuizAnswers_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."QuizAnswers" DROP CONSTRAINT "QuizAnswers_pkey";
       public            postgres    false    222            �           2606    20187     QuizQuestions QuizQuestions_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."QuizQuestions"
    ADD CONSTRAINT "QuizQuestions_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."QuizQuestions" DROP CONSTRAINT "QuizQuestions_pkey";
       public            postgres    false    220            �           2606    20221    QuizResults QuizResults_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."QuizResults"
    ADD CONSTRAINT "QuizResults_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."QuizResults" DROP CONSTRAINT "QuizResults_pkey";
       public            postgres    false    224            �           2606    20173    Quizzes Quizzes_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Quizzes"
    ADD CONSTRAINT "Quizzes_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Quizzes" DROP CONSTRAINT "Quizzes_pkey";
       public            postgres    false    218            �           2606    20140     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    214            �           2606    20149    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    216            �           2606    20247    Users users_un 
   CONSTRAINT     L   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT users_un UNIQUE (email);
 :   ALTER TABLE ONLY public."Users" DROP CONSTRAINT users_un;
       public            postgres    false    216            �           2606    20210 '   QuizAnswers QuizAnswers_questionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuizAnswers"
    ADD CONSTRAINT "QuizAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."QuizQuestions"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public."QuizAnswers" DROP CONSTRAINT "QuizAnswers_questionId_fkey";
       public          postgres    false    3211    222    220            �           2606    20205 #   QuizAnswers QuizAnswers_quizId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuizAnswers"
    ADD CONSTRAINT "QuizAnswers_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES public."Quizzes"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."QuizAnswers" DROP CONSTRAINT "QuizAnswers_quizId_fkey";
       public          postgres    false    222    3209    218            �           2606    20200 #   QuizAnswers QuizAnswers_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuizAnswers"
    ADD CONSTRAINT "QuizAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."QuizAnswers" DROP CONSTRAINT "QuizAnswers_userId_fkey";
       public          postgres    false    3205    216    222            �           2606    20188 '   QuizQuestions QuizQuestions_quizId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuizQuestions"
    ADD CONSTRAINT "QuizQuestions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES public."Quizzes"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public."QuizQuestions" DROP CONSTRAINT "QuizQuestions_quizId_fkey";
       public          postgres    false    218    220    3209            �           2606    20227 #   QuizResults QuizResults_quizId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuizResults"
    ADD CONSTRAINT "QuizResults_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES public."Quizzes"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."QuizResults" DROP CONSTRAINT "QuizResults_quizId_fkey";
       public          postgres    false    3209    218    224            �           2606    20222 #   QuizResults QuizResults_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuizResults"
    ADD CONSTRAINT "QuizResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."QuizResults" DROP CONSTRAINT "QuizResults_userId_fkey";
       public          postgres    false    224    3205    216            �           2606    20174    Quizzes Quizzes_creatorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Quizzes"
    ADD CONSTRAINT "Quizzes_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."Quizzes" DROP CONSTRAINT "Quizzes_creatorId_fkey";
       public          postgres    false    216    218    3205            -      x������ � �      +   6  x�}P�N�0<�_�?��v��.� �����4Kj���P�z���(DX�jwg�3;��9y�J�VRCi�`���X�~��
�rde���Bյ;un��U;�tE��M��.3����"a� �y'a_K���P���|.�ߞ�#���m�!EQ��X�B�F�z��S�u�����<6ރ�*�]�p��7g5��N[tِo*�҃(��Rl��K8+w�������mh�#4؛�+�|>Fك(�"�����*Z���|��s�J�.�(m��^�3�8>X���������t1����R�v׭�      /      x������ � �      )   D   x���,ͬRI-.��K��
 ANCN##N##c]3]#C3++#3=C]s<R\1z\\\ ��b      %   u   x�32026032104435�M.JM,I�--N-��*�2���dK3��d�M�e�DjqIf~�2##Ct��1l2F�I�(��4�U������cJJP~NjH~(й� 1z\\\ �=[      '   �   x�����@ 뻯��w8�J�#��Qc���4'ѯW+���f�B6�酩'd����؝J�Q�!h�=�x]|�^���cZO��q2�$�ca7�.�'�u��6�������j��L�4�#tp~)�D���y��������^�e����*���ͤF��0h�g]õ̯3o|cp���K�     